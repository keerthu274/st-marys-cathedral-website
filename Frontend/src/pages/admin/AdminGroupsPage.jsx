import { useEffect, useState } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import FeedbackDialog from '../../components/FeedbackDialog'
import { createGroup, deleteGroup, getGroup, listGroups, updateGroup } from '../../lib/admin'
import { hasErrors, requireField, validateMaxLength } from '../../lib/validation'

const emptyGroupForm = {
  name: '',
  description: '',
  is_active: true,
  admin_user_id: '',
}

function FieldError({ errors, name }) {
  if (!errors?.[name]?.[0]) {
    return null
  }

  return <p className="admin-field-error">{errors[name][0]}</p>
}

export default function AdminGroupsPage() {
  const { user } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [groups, setGroups] = useState([])
  const [availableAdmins, setAvailableAdmins] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [groupForm, setGroupForm] = useState(emptyGroupForm)
  const [groupErrors, setGroupErrors] = useState({})
  const [isSavingGroup, setIsSavingGroup] = useState(false)
  const [isLoadingGroupEditor, setIsLoadingGroupEditor] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [dialogState, setDialogState] = useState({
    open: false,
    tone: 'neutral',
    title: '',
    message: '',
  })

  useEffect(() => {
    let ignore = false

    async function loadGroups() {
      if (!user?.is_main_admin) {
        return
      }

      try {
        const payload = await listGroups()

        if (!ignore) {
          setGroups(payload.groups || [])
          setAvailableAdmins(payload.available_admins || [])
        }
      } catch (error) {
        if (!ignore) {
          openDialog('error', 'Unable to load groups', error.message || 'The group list could not be loaded.')
        }
      }
    }

    loadGroups()

    return () => {
      ignore = true
    }
  }, [user?.is_main_admin])

  useEffect(() => {
    const editId = searchParams.get('edit')

    if (!editId || !user?.is_main_admin) {
      return
    }

    editGroup(Number(editId))
  }, [searchParams, user?.is_main_admin])

  function closeDialog() {
    setDialogState(current => ({ ...current, open: false }))
  }

  function openDialog(tone, title, message) {
    setDialogState({ open: true, tone, title, message })
  }

  async function refreshGroups() {
    const payload = await listGroups()
    setGroups(payload.groups || [])
    setAvailableAdmins(payload.available_admins || [])
  }

  function startNewGroup() {
    setSelectedGroupId(null)
    setGroupForm(emptyGroupForm)
    setGroupErrors({})
    setSearchParams({})
  }

  async function editGroup(id) {
    setIsLoadingGroupEditor(true)

    try {
      const payload = await getGroup(id)
      const item = payload.group

      setSelectedGroupId(id)
      setGroupForm({
        name: item.name || '',
        description: item.description || '',
        is_active: Boolean(item.is_active),
        admin_user_id: item.admin_user_id ? String(item.admin_user_id) : '',
      })
      setGroupErrors({})
      setSearchParams({ edit: String(id) })
    } catch (error) {
      openDialog('error', 'Unable to load group', error.message || 'The selected group could not be opened.')
    } finally {
      setIsLoadingGroupEditor(false)
    }
  }

  function handleGroupChange(event) {
    const { name, value, type, checked } = event.target
    const nextForm = {
      ...groupForm,
      [name]: type === 'checkbox' ? checked : value,
    }

    setGroupForm(nextForm)
    setGroupErrors(current => ({
      ...current,
      ...validateGroupLiveFields(nextForm, name),
    }))
  }

  function validateGroupForm() {
    const nextErrors = {}
    requireField(nextErrors, 'name', groupForm.name, 'Group name')
    validateMaxLength(nextErrors, 'name', groupForm.name, 255, 'Group name')
    validateMaxLength(nextErrors, 'description', groupForm.description, 2000, 'Description')
    return nextErrors
  }

  function validateGroupLiveFields(form, changedName) {
    const nextErrors = {}

    if (changedName === 'name') {
      requireField(nextErrors, 'name', form.name, 'Group name')
      validateMaxLength(nextErrors, 'name', form.name, 255, 'Group name')
    }

    if (changedName === 'description') {
      validateMaxLength(nextErrors, 'description', form.description, 2000, 'Description')
    }

    return {
      [changedName]: nextErrors[changedName],
    }
  }

  async function submitGroup(event) {
    event.preventDefault()
    const validationErrors = validateGroupForm()
    setGroupErrors(validationErrors)

    if (hasErrors(validationErrors)) {
      openDialog('error', 'Please check the group form', 'Fix the highlighted fields before saving this group.')
      return
    }

    setIsSavingGroup(true)

    const payload = {
      name: groupForm.name,
      description: groupForm.description || '',
      is_active: groupForm.is_active,
      admin_user_id: groupForm.admin_user_id ? Number(groupForm.admin_user_id) : null,
    }

    try {
      const response = selectedGroupId
        ? await updateGroup(selectedGroupId, payload)
        : await createGroup(payload)

      await refreshGroups()
      startNewGroup()
      openDialog('success', 'Group saved successfully', response.message || 'The group has been saved.')
    } catch (error) {
      setGroupErrors(error.errors || {})
      openDialog('error', 'Unable to save group', error.message || 'Please review the group details and try again.')
    } finally {
      setIsSavingGroup(false)
    }
  }

  async function removeGroup(id) {
    try {
      const payload = await deleteGroup(id)
      await refreshGroups()

      if (selectedGroupId === id) {
        startNewGroup()
      }

      openDialog('success', 'Group deleted successfully', payload.message || 'The group has been removed.')
    } catch (error) {
      openDialog('error', 'Unable to delete group', error.message || 'The group could not be deleted at this time.')
    } finally {
      setConfirmDeleteId(null)
    }
  }

  if (!user?.is_main_admin) {
    return (
      <div className="admin-page-grid">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>My Group</h2>
              <p>Your account is currently assigned to {user?.group?.name || 'no group yet'}.</p>
            </div>
          </div>
          <div className="admin-detail-block">
            <h3>Group Access</h3>
            <p>Group admins can manage only their own draft events and their own group contact enquiries.</p>
            <p>Published events, parish registrations, Mass times, and parish council management remain with the main admin.</p>
          </div>
        </article>
      </div>
    )
  }

  return (
    <div className="admin-page-grid two-col">
      <div className="admin-page-grid">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Groups</h2>
              <p>Create groups and assign signed-up users as their group admins.</p>
            </div>
            <button className="btn-primary" type="button" onClick={startNewGroup}>New Group</button>
          </div>

          <div className="admin-data-table">
            {groups.map(item => {
              const assignedAdmin = availableAdmins.find(admin => admin.group_id === item.id)

              return (
                <div key={item.id} className="admin-row">
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.description || 'No description yet.'}</span>
                  </div>
                  <div>
                    <small>{assignedAdmin ? `${assignedAdmin.name} • ${assignedAdmin.email}` : 'No group admin assigned'}</small>
                    <span className="admin-badge">{item.is_active ? 'active' : 'hidden'}</span>
                  </div>
                  <div className="admin-row-actions">
                    <button type="button" onClick={() => editGroup(item.id)}>Edit</button>
                    <button type="button" className="danger" onClick={() => setConfirmDeleteId(item.id)}>Delete</button>
                  </div>
                </div>
              )
            })}
            {!groups.length ? <p className="admin-empty">No groups have been created yet.</p> : null}
          </div>
        </article>
      </div>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>{selectedGroupId ? 'Edit Group' : 'Create Group'}</h2>
            <p>{isLoadingGroupEditor ? 'Loading group...' : 'Assign a signed-up user as the group admin if needed.'}</p>
          </div>
        </div>

        <form className="admin-form" onSubmit={submitGroup} noValidate>
          <label>
            <span>Group name</span>
            <input name="name" value={groupForm.name} onChange={handleGroupChange} aria-invalid={Boolean(groupErrors.name)} />
            <FieldError errors={groupErrors} name="name" />
          </label>

          <label>
            <span>Description</span>
            <textarea name="description" rows="4" value={groupForm.description} onChange={handleGroupChange} aria-invalid={Boolean(groupErrors.description)} />
            <FieldError errors={groupErrors} name="description" />
          </label>

          <label>
            <span>Assigned group admin</span>
            <select name="admin_user_id" value={groupForm.admin_user_id} onChange={handleGroupChange}>
              <option value="">No group admin assigned</option>
              {availableAdmins.map(admin => (
                <option
                  key={admin.id}
                  value={admin.id}
                  disabled={admin.group_id !== null && String(admin.group_id) !== String(selectedGroupId || '')}
                >
                  {admin.name} ({admin.email}){admin.group_id ? ' - already assigned' : ''}
                </option>
              ))}
            </select>
          </label>

          <label className="admin-checkbox">
            <input type="checkbox" name="is_active" checked={groupForm.is_active} onChange={handleGroupChange} />
            <span>Show this group as active</span>
          </label>

          <div className="admin-actions">
            <button className="btn-primary" type="submit" disabled={isSavingGroup}>
              {isSavingGroup ? 'Saving...' : selectedGroupId ? 'Update Group' : 'Create Group'}
            </button>
            <button className="btn-outline" type="button" onClick={startNewGroup}>Reset</button>
          </div>
        </form>
      </article>

      <FeedbackDialog
        open={dialogState.open}
        tone={dialogState.tone}
        title={dialogState.title}
        message={dialogState.message}
        confirmLabel="Close"
        onClose={closeDialog}
      />
      <FeedbackDialog
        open={confirmDeleteId !== null}
        tone="neutral"
        variant="confirm"
        title="Delete this group?"
        message="This will remove the group and unassign its current group admin."
        confirmLabel="Delete Group"
        cancelLabel="Keep Group"
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => removeGroup(confirmDeleteId)}
      />
    </div>
  )
}
