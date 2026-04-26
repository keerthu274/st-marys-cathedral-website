import { useEffect, useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { listGroups } from '../../lib/admin'
import { titleCaseWords } from '../../lib/textFormat'

function buildAssignmentMap(groups) {
  return new Map(
    groups
      .filter(group => group.admin_user)
      .map(group => [
        group.admin_user.id,
        {
          groupId: group.id,
          groupName: group.name,
        },
      ]),
  )
}

function formatDisplayText(value, fallback = 'Not set') {
  return value ? titleCaseWords(value) : fallback
}

export default function AdminAccountsPage() {
  const { user } = useOutletContext()
  const [groups, setGroups] = useState([])
  const [availableAdmins, setAvailableAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadData() {
      if (!user?.is_main_admin) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      try {
        const payload = await listGroups()

        if (ignore) {
          return
        }

        setGroups(payload.groups || [])
        setAvailableAdmins(payload.available_admins || [])
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || 'The admin accounts workspace could not be loaded.')
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

  const assignmentMap = useMemo(() => buildAssignmentMap(groups), [groups])
  const groupAdmins = useMemo(() => (
    availableAdmins
      .filter(admin => assignmentMap.has(admin.id))
      .sort((left, right) => left.name.localeCompare(right.name))
  ), [assignmentMap, availableAdmins])
  const unassignedAdmins = useMemo(() => (
    availableAdmins
      .filter(admin => !assignmentMap.has(admin.id))
      .sort((left, right) => left.name.localeCompare(right.name))
  ), [assignmentMap, availableAdmins])

  if (!user?.is_main_admin) {
    return (
      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>Admin Accounts</h2>
            <p>Only the main admin can review and organise admin account assignments.</p>
          </div>
        </div>
        <p className="admin-empty">Your account can still update its own details from the profile page.</p>
      </article>
    )
  }

  if (isLoading) {
    return <div className="admin-surface admin-loading">Loading admin accounts...</div>
  }

  const assignedCount = groupAdmins.length
  const unassignedCount = unassignedAdmins.length
  const totalAdminCount = availableAdmins.length + 1

  return (
    <div className="admin-page-grid">
      {errorMessage ? <div className="admin-notice error"><span>{errorMessage}</span></div> : null}

      <div className="admin-detail-grid">
        <div className="admin-detail-card">
          <span>Total admin accounts</span>
          <strong>{totalAdminCount}</strong>
        </div>
        <div className="admin-detail-card">
          <span>Assigned group admins</span>
          <strong>{assignedCount}</strong>
        </div>
        <div className="admin-detail-card">
          <span>Unassigned admins</span>
          <strong>{unassignedCount}</strong>
        </div>
        <div className="admin-detail-card">
          <span>Active groups</span>
          <strong>{groups.length}</strong>
        </div>
      </div>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>Main Admin</h2>
            <p>This account keeps full access to the whole admin area and can assign group admins.</p>
          </div>
          <Link className="btn-outline" to="/dashboard/profile">Open Profile</Link>
        </div>

        <div className="admin-data-table">
          <div className="admin-row">
            <div>
              <strong>{formatDisplayText(user?.name, 'Main Admin')}</strong>
              <span>{user?.email || 'No email available'}</span>
            </div>
            <div>
              <small>Role</small>
              <span className="admin-badge">Main Admin</span>
            </div>
          </div>
        </div>
      </article>

      <div className="admin-page-grid two-col">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Assigned Group Admins</h2>
              <p>These accounts are already attached to a group and can manage their own group area.</p>
            </div>
            <Link className="btn-outline" to="/dashboard/groups">Manage Groups</Link>
          </div>

          <div className="admin-data-table">
            {groupAdmins.map(admin => {
              const assignment = assignmentMap.get(admin.id)

              return (
                <div key={admin.id} className="admin-row">
                  <div>
                    <strong>{formatDisplayText(admin.name)}</strong>
                    <span>{admin.email}</span>
                  </div>
                  <div>
                    <small>Assigned group</small>
                    <span>{formatDisplayText(assignment?.groupName, 'Unknown Group')}</span>
                  </div>
                  <div className="admin-row-actions">
                    {assignment?.groupId ? <Link to={`/dashboard/groups?group=${assignment.groupId}`}>Open Group</Link> : null}
                  </div>
                </div>
              )
            })}
            {!groupAdmins.length ? <p className="admin-empty">No group admins have been assigned yet.</p> : null}
          </div>
        </article>

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Unassigned Admins</h2>
              <p>These admin accounts exist, but they are not linked to any parish group yet.</p>
            </div>
            <Link className="btn-outline" to="/dashboard/groups">Assign in Groups</Link>
          </div>

          <div className="admin-data-table">
            {unassignedAdmins.map(admin => (
              <div key={admin.id} className="admin-row">
                <div>
                  <strong>{formatDisplayText(admin.name)}</strong>
                  <span>{admin.email}</span>
                </div>
                <div>
                  <small>Status</small>
                  <span>Ready to assign</span>
                </div>
              </div>
            ))}
            {!unassignedAdmins.length ? <p className="admin-empty">Every existing admin account is already assigned to a group.</p> : null}
          </div>
        </article>
      </div>
    </div>
  )
}
