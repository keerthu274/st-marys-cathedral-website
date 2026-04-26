import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { getOverview, listGroups } from '../../lib/admin'
import { capitalizeFirst, titleCaseWords } from '../../lib/textFormat'

function formatDateTime(value) {
  if (!value) {
    return 'Not recorded yet'
  }

  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDisplayText(value, fallback = 'Not set') {
  return value ? titleCaseWords(value) : fallback
}

function formatCopy(value, fallback = 'Not set') {
  return value ? capitalizeFirst(value) : fallback
}

export default function AdminMyGroupPage() {
  const { user } = useOutletContext()
  const [group, setGroup] = useState(null)
  const [overview, setOverview] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadData() {
      if (user?.is_main_admin) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const [groupsPayload, overviewPayload] = await Promise.all([
          listGroups(),
          getOverview(),
        ])

        if (ignore) {
          return
        }

        setGroup(groupsPayload.groups?.[0] || null)
        setOverview(overviewPayload)
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || 'The group admin workspace could not be loaded.')
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [user?.is_main_admin])

  if (user?.is_main_admin) {
    return (
      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>My Group</h2>
            <p>This workspace is only for assigned group admins.</p>
          </div>
        </div>
        <p className="admin-empty">Main admins can manage all groups from the main groups page.</p>
      </article>
    )
  }

  if (isLoading) {
    return <div className="admin-surface admin-loading">Loading your group workspace...</div>
  }

  if (!group) {
    return (
      <div className="admin-page-grid">
        {errorMessage ? <div className="admin-notice error"><span>{errorMessage}</span></div> : null}
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>My Group</h2>
              <p>Your account is not assigned to a group yet.</p>
            </div>
          </div>
          <p className="admin-empty">Ask the main admin to assign this account to a parish group so you can manage members and enquiries.</p>
        </article>
      </div>
    )
  }

  const recentMembers = group.members?.slice(0, 5) || []
  const totalMembers = overview?.stats?.group_members?.total || group.members_count || 0
  const totalEvents = overview?.stats?.events?.total || 0
  const totalMessages = overview?.stats?.contact_messages?.total || 0

  return (
    <div className="admin-page-grid">
      {errorMessage ? <div className="admin-notice error"><span>{errorMessage}</span></div> : null}

      <div className="admin-detail-grid">
        <div className="admin-detail-card">
          <span>Assigned group</span>
          <strong>{formatDisplayText(group.name)}</strong>
        </div>
        <div className="admin-detail-card">
          <span>Registered members</span>
          <strong>{totalMembers}</strong>
        </div>
        <div className="admin-detail-card">
          <span>Group events</span>
          <strong>{totalEvents}</strong>
        </div>
        <div className="admin-detail-card">
          <span>Group enquiries</span>
          <strong>{totalMessages}</strong>
        </div>
      </div>

      <div className="admin-page-grid two-col">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Group Details</h2>
              <p>Your account manages this parish group and its member records.</p>
            </div>
            <Link className="btn-outline" to={`/dashboard/groups?group=${group.id}`}>Open Group Manager</Link>
          </div>

          <div className="admin-detail-grid">
            <div className="admin-detail-card">
              <span>Group name</span>
              <strong>{formatDisplayText(group.name)}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Status</span>
              <strong>{group.is_active ? 'Active' : 'Hidden from public pages'}</strong>
            </div>
          </div>

          <article className="admin-detail-block admin-detail-block-full" style={{ marginTop: '16px' }}>
            <h3>Description</h3>
            <p>{formatCopy(group.description, 'No group description has been added yet.')}</p>
          </article>

          <div className="admin-actions" style={{ marginTop: '16px' }}>
            <Link className="btn-primary" to="/dashboard/events">Manage Group Events</Link>
            <Link className="btn-outline" to="/dashboard/contact-messages">View Group Enquiries</Link>
          </div>
        </article>

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Recent Members</h2>
              <p>The newest member records in your assigned group appear here.</p>
            </div>
            <Link className="btn-outline" to={`/dashboard/groups?group=${group.id}`}>Manage Members</Link>
          </div>

          <div className="admin-data-table">
            {recentMembers.map(member => (
              <div key={member.id} className="admin-row">
                <div>
                  <strong>{formatDisplayText(member.name)}</strong>
                  <span>{member.role ? formatDisplayText(member.role) : member.email || 'No role or email recorded yet.'}</span>
                </div>
                <div>
                  <small>Added</small>
                  <span>{formatDateTime(member.created_at)}</span>
                </div>
              </div>
            ))}
            {!recentMembers.length ? <p className="admin-empty">No members have been registered in this group yet.</p> : null}
          </div>
        </article>
      </div>
    </div>
  )
}
