import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { deleteRegistration, getRegistration, listRegistrations, updateRegistration } from '../../lib/admin'

function formatDate(value) {
  if (!value) {
    return 'Not set'
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function initialRegistrationForm(registration) {
  return {
    full_name: registration?.full_name || '',
    email: registration?.email || '',
    phone: registration?.phone || '',
    partner_name: registration?.partner_name || '',
    children: registration?.children?.length
      ? registration.children.map(child => ({
          child_name: child.child_name || '',
          age: child.age || '',
        }))
      : [{ child_name: '', age: '' }],
    volunteering: Boolean(registration?.interest?.volunteering),
    parish_groups: Boolean(registration?.interest?.parish_groups),
    sacramental_preparation: Boolean(registration?.interest?.sacramental_preparation),
    weekly_newsletter: Boolean(registration?.interest?.weekly_newsletter),
  }
}

function Notice({ notice, onDismiss }) {
  if (!notice.message) {
    return null
  }

  return (
    <div className={`admin-notice ${notice.type}`}>
      <span>{notice.message}</span>
      <button type="button" onClick={onDismiss} aria-label="Dismiss notification">x</button>
    </div>
  )
}

export default function AdminRegistrationsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [registrations, setRegistrations] = useState([])
  const [registrationMeta, setRegistrationMeta] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [selectedRegistrationId, setSelectedRegistrationId] = useState(null)
  const [registrationDetail, setRegistrationDetail] = useState(null)
  const [registrationForm, setRegistrationForm] = useState(initialRegistrationForm(null))
  const [isEditingRegistration, setIsEditingRegistration] = useState(false)
  const [isLoadingRegistration, setIsLoadingRegistration] = useState(false)
  const [isSavingRegistration, setIsSavingRegistration] = useState(false)
  const [notice, setNotice] = useState({ type: '', message: '' })

  useEffect(() => {
    let ignore = false

    async function loadData() {
      const payload = await listRegistrations(1)

      if (ignore) {
        return
      }

      const items = payload.registrations || []
      setRegistrations(items)
      setRegistrationMeta(payload.meta || { current_page: 1, last_page: 1, total: 0 })

      const querySelected = searchParams.get('selected')
      const nextId = querySelected ? Number(querySelected) : items[0]?.id
      if (nextId) {
        setSelectedRegistrationId(nextId)
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const selected = searchParams.get('selected')

    if (selected) {
      setSelectedRegistrationId(Number(selected))
    }
  }, [searchParams])

  useEffect(() => {
    let ignore = false

    async function loadRegistrationDetail() {
      if (!selectedRegistrationId) {
        setRegistrationDetail(null)
        return
      }

      setIsLoadingRegistration(true)

      try {
        const payload = await getRegistration(selectedRegistrationId)

        if (!ignore) {
          setRegistrationDetail(payload.registration || null)
          setRegistrationForm(initialRegistrationForm(payload.registration))
          setIsEditingRegistration(false)
        }
      } catch (error) {
        if (!ignore) {
          setNotice({ type: 'error', message: error.message || 'Unable to load the selected registration.' })
        }
      } finally {
        if (!ignore) {
          setIsLoadingRegistration(false)
        }
      }
    }

    loadRegistrationDetail()

    return () => {
      ignore = true
    }
  }, [selectedRegistrationId])

  function dismissNotice() {
    setNotice({ type: '', message: '' })
  }

  async function refreshRegistrations(page = registrationMeta.current_page || 1) {
    const payload = await listRegistrations(page)
    const items = payload.registrations || []
    setRegistrations(items)
    setRegistrationMeta(payload.meta || { current_page: page, last_page: 1, total: 0 })

    if (!items.some(item => item.id === selectedRegistrationId)) {
      const nextId = items[0]?.id || null
      setSelectedRegistrationId(nextId)

      if (nextId) {
        setSearchParams({ selected: String(nextId) })
      } else {
        setSearchParams({})
      }
    }
  }

  function handleRegistrationChange(event) {
    const { name, value, type, checked } = event.target
    setRegistrationForm(current => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleChildChange(index, field, value) {
    setRegistrationForm(current => ({
      ...current,
      children: current.children.map((child, childIndex) =>
        childIndex === index ? { ...child, [field]: value } : child,
      ),
    }))
  }

  function addChildRow() {
    setRegistrationForm(current => ({
      ...current,
      children: [...current.children, { child_name: '', age: '' }],
    }))
  }

  function removeChildRow(index) {
    setRegistrationForm(current => ({
      ...current,
      children: current.children.filter((_, childIndex) => childIndex !== index),
    }))
  }

  async function saveRegistration(event) {
    event.preventDefault()
    if (!registrationDetail) {
      return
    }

    setIsSavingRegistration(true)
    dismissNotice()

    const payload = {
      ...registrationForm,
      children: registrationForm.children.filter(child => child.child_name.trim()),
    }

    try {
      const response = await updateRegistration(registrationDetail.id, payload)
      setRegistrationDetail(response.registration || null)
      setRegistrationForm(initialRegistrationForm(response.registration))
      setIsEditingRegistration(false)
      await refreshRegistrations()
      setNotice({ type: 'success', message: response.message || 'Registration updated successfully.' })
    } catch (error) {
      setNotice({ type: 'error', message: error.message || 'Unable to update the registration.' })
    } finally {
      setIsSavingRegistration(false)
    }
  }

  async function removeRegistration(id) {
    if (!window.confirm('Delete this parish registration?')) {
      return
    }

    dismissNotice()

    try {
      const payload = await deleteRegistration(id)
      await refreshRegistrations()
      setNotice({ type: 'success', message: payload.message || 'Registration deleted successfully.' })
    } catch (error) {
      setNotice({ type: 'error', message: error.message || 'Unable to delete the registration.' })
    }
  }

  return (
    <div className="admin-page-grid two-col">
      <div className="admin-page-grid">
        <Notice notice={notice} onDismiss={dismissNotice} />

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Parish Registrations</h2>
              <p>Review member details and keep parish records tidy.</p>
            </div>
          </div>

          <div className="admin-data-table">
            {registrations.map(item => (
              <button
                key={item.id}
                type="button"
                className={`admin-row ${selectedRegistrationId === item.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRegistrationId(item.id)
                  setSearchParams({ selected: String(item.id) })
                }}
              >
                <div>
                  <strong>{item.full_name}</strong>
                  <span>{item.member_id}</span>
                </div>
                <div>
                  <small>{item.email}</small>
                  <span className="admin-badge">{item.registration_type}</span>
                </div>
              </button>
            ))}
            {!registrations.length ? <p className="admin-empty">No registrations are available.</p> : null}
          </div>

          <div className="admin-pagination">
            <button className="btn-outline" type="button" onClick={() => refreshRegistrations(Math.max(1, registrationMeta.current_page - 1))} disabled={registrationMeta.current_page <= 1}>
              Previous
            </button>
            <span>Page {registrationMeta.current_page} of {registrationMeta.last_page}</span>
            <button className="btn-outline" type="button" onClick={() => refreshRegistrations(Math.min(registrationMeta.last_page, registrationMeta.current_page + 1))} disabled={registrationMeta.current_page >= registrationMeta.last_page}>
              Next
            </button>
          </div>
        </article>
      </div>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>Registration Details</h2>
            <p>{isLoadingRegistration ? 'Loading registration...' : 'Review the record or switch into edit mode.'}</p>
          </div>
          {registrationDetail ? (
            <div className="admin-actions">
              <button className="btn-outline" type="button" onClick={() => setIsEditingRegistration(current => !current)}>
                {isEditingRegistration ? 'Cancel Edit' : 'Edit'}
              </button>
              <button className="btn-primary" type="button" onClick={() => removeRegistration(registrationDetail.id)}>
                Delete
              </button>
            </div>
          ) : null}
        </div>

        {!registrationDetail && !isLoadingRegistration ? <p className="admin-empty">Select a registration to view details.</p> : null}

        {registrationDetail && !isEditingRegistration ? (
          <div className="admin-detail-grid">
            <div className="admin-detail-card">
              <span>Member ID</span>
              <strong>{registrationDetail.member_id}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Type</span>
              <strong>{registrationDetail.registration_type}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Signed Date</span>
              <strong>{formatDate(registrationDetail.signed_date)}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Contact</span>
              <strong>{registrationDetail.email}</strong>
            </div>

            <article className="admin-detail-block">
              <h3>Member Information</h3>
              <p>{registrationDetail.full_name}</p>
              <p>{registrationDetail.phone}</p>
              <p>{registrationDetail.partner_name || 'No partner listed'}</p>
              <p>
                {registrationDetail.address_line1}
                {registrationDetail.address_line2 ? `, ${registrationDetail.address_line2}` : ''}
                , {registrationDetail.city}, {registrationDetail.postcode}
              </p>
            </article>

            <article className="admin-detail-block">
              <h3>Children</h3>
              {registrationDetail.children?.length ? (
                <ul className="admin-inline-list">
                  {registrationDetail.children.map(child => (
                    <li key={`${child.id}-${child.child_name}`}>{child.child_name} ({child.age || 'N/A'})</li>
                  ))}
                </ul>
              ) : <p>No children listed.</p>}
            </article>

            <article className="admin-detail-block">
              <h3>Interests</h3>
              <ul className="admin-inline-list">
                {registrationDetail.interest?.volunteering ? <li>Volunteering</li> : null}
                {registrationDetail.interest?.parish_groups ? <li>Parish Groups</li> : null}
                {registrationDetail.interest?.sacramental_preparation ? <li>Sacramental Preparation</li> : null}
                {registrationDetail.interest?.weekly_newsletter ? <li>Weekly Newsletter</li> : null}
                {!registrationDetail.interest?.volunteering &&
                !registrationDetail.interest?.parish_groups &&
                !registrationDetail.interest?.sacramental_preparation &&
                !registrationDetail.interest?.weekly_newsletter ? <li>No interests recorded.</li> : null}
              </ul>
            </article>
          </div>
        ) : null}

        {registrationDetail && isEditingRegistration ? (
          <form className="admin-form" onSubmit={saveRegistration}>
            <div className="admin-form-grid">
              <label>
                <span>Full name</span>
                <input name="full_name" value={registrationForm.full_name} onChange={handleRegistrationChange} />
              </label>

              <label>
                <span>Email</span>
                <input type="email" name="email" value={registrationForm.email} onChange={handleRegistrationChange} />
              </label>
            </div>

            <div className="admin-form-grid">
              <label>
                <span>Phone</span>
                <input name="phone" value={registrationForm.phone} onChange={handleRegistrationChange} />
              </label>

              <label>
                <span>Partner name</span>
                <input name="partner_name" value={registrationForm.partner_name} onChange={handleRegistrationChange} />
              </label>
            </div>

            <div className="admin-panel">
              <strong>Children</strong>
              <div className="admin-children-list">
                {registrationForm.children.map((child, index) => (
                  <div key={`${index}-${child.child_name}`} className="admin-child-row">
                    <input placeholder="Child name" value={child.child_name} onChange={event => handleChildChange(index, 'child_name', event.target.value)} />
                    <input placeholder="Age" type="number" value={child.age} onChange={event => handleChildChange(index, 'age', event.target.value)} />
                    <button type="button" className="admin-link-btn danger" onClick={() => removeChildRow(index)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="admin-link-btn" onClick={addChildRow}>Add child</button>
            </div>

            <div className="admin-check-grid">
              <label className="admin-checkbox">
                <input type="checkbox" name="volunteering" checked={registrationForm.volunteering} onChange={handleRegistrationChange} />
                <span>Volunteering</span>
              </label>
              <label className="admin-checkbox">
                <input type="checkbox" name="parish_groups" checked={registrationForm.parish_groups} onChange={handleRegistrationChange} />
                <span>Parish groups</span>
              </label>
              <label className="admin-checkbox">
                <input type="checkbox" name="sacramental_preparation" checked={registrationForm.sacramental_preparation} onChange={handleRegistrationChange} />
                <span>Sacramental preparation</span>
              </label>
              <label className="admin-checkbox">
                <input type="checkbox" name="weekly_newsletter" checked={registrationForm.weekly_newsletter} onChange={handleRegistrationChange} />
                <span>Weekly newsletter</span>
              </label>
            </div>

            <div className="admin-actions">
              <button className="btn-primary" type="submit" disabled={isSavingRegistration}>
                {isSavingRegistration ? 'Saving...' : 'Save Changes'}
              </button>
              <button className="btn-outline" type="button" onClick={() => setIsEditingRegistration(false)}>Cancel</button>
            </div>
          </form>
        ) : null}
      </article>
    </div>
  )
}
