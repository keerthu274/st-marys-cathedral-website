import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createMassTime, deleteMassTime, getMassTime, listMassTimes, listMassTimesByDay, updateMassTime } from '../../lib/admin'

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const emptyMassTimeForm = {
  day: '',
  start_time: '',
  location: '',
  language: '',
  notes: '',
  status: 'draft',
}

function formatTime(value) {
  if (!value) {
    return 'Not set'
  }

  return value.slice(0, 5)
}

function FieldError({ errors, name }) {
  if (!errors?.[name]?.[0]) {
    return null
  }

  return <p className="admin-field-error">{errors[name][0]}</p>
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

export default function AdminMassTimesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [massTimes, setMassTimes] = useState([])
  const [massTimeMeta, setMassTimeMeta] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [massPreview, setMassPreview] = useState([])
  const [selectedMassTimeId, setSelectedMassTimeId] = useState(null)
  const [massTimeForm, setMassTimeForm] = useState(emptyMassTimeForm)
  const [massTimeErrors, setMassTimeErrors] = useState({})
  const [notice, setNotice] = useState({ type: '', message: '' })
  const [isSavingMassTime, setIsSavingMassTime] = useState(false)
  const [isLoadingMassTimeEditor, setIsLoadingMassTimeEditor] = useState(false)

  useEffect(() => {
    let ignore = false

    async function loadData() {
      const payload = await listMassTimes(1)

      if (!ignore) {
        setMassTimes(payload.mass_times || [])
        setMassTimeMeta(payload.meta || { current_page: 1, last_page: 1, total: 0 })
      }
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const editId = searchParams.get('edit')

    if (!editId) {
      return
    }

    editMassTime(Number(editId))
  }, [searchParams])

  useEffect(() => {
    let ignore = false

    async function loadPreview() {
      if (!massTimeForm.day) {
        setMassPreview([])
        return
      }

      try {
        const data = await listMassTimesByDay(massTimeForm.day, massTimeForm.location)

        if (!ignore) {
          setMassPreview((data || []).filter(item => item.id !== selectedMassTimeId))
        }
      } catch {
        if (!ignore) {
          setMassPreview([])
        }
      }
    }

    loadPreview()

    return () => {
      ignore = true
    }
  }, [massTimeForm.day, massTimeForm.location, selectedMassTimeId])

  function dismissNotice() {
    setNotice({ type: '', message: '' })
  }

  async function refreshMassTimes(page = massTimeMeta.current_page || 1) {
    const payload = await listMassTimes(page)
    setMassTimes(payload.mass_times || [])
    setMassTimeMeta(payload.meta || { current_page: page, last_page: 1, total: 0 })
  }

  function handleMassTimeChange(event) {
    const { name, value } = event.target
    setMassTimeForm(current => ({ ...current, [name]: value }))
    setMassTimeErrors(current => ({ ...current, [name]: undefined }))
  }

  async function editMassTime(id) {
    setIsLoadingMassTimeEditor(true)
    dismissNotice()

    try {
      const payload = await getMassTime(id)
      const item = payload.mass_time

      setSelectedMassTimeId(id)
      setMassTimeForm({
        day: item.day || '',
        start_time: item.start_time || '',
        location: item.location || '',
        language: item.language || '',
        notes: item.notes || '',
        status: item.status || 'draft',
      })
      setMassTimeErrors({})
      setSearchParams({ edit: String(id) })
    } catch (error) {
      setNotice({ type: 'error', message: error.message || 'Unable to load the selected Mass time.' })
    } finally {
      setIsLoadingMassTimeEditor(false)
    }
  }

  function startNewMassTime() {
    setSelectedMassTimeId(null)
    setMassTimeForm(emptyMassTimeForm)
    setMassTimeErrors({})
    setSearchParams({})
  }

  async function submitMassTime(event) {
    event.preventDefault()
    setIsSavingMassTime(true)
    dismissNotice()

    try {
      const payload = selectedMassTimeId
        ? await updateMassTime(selectedMassTimeId, massTimeForm)
        : await createMassTime(massTimeForm)

      await refreshMassTimes()
      setNotice({ type: 'success', message: payload.message || 'Mass time saved successfully.' })

      if (!selectedMassTimeId && payload.mass_time?.id) {
        setSelectedMassTimeId(payload.mass_time.id)
        setSearchParams({ edit: String(payload.mass_time.id) })
      }
    } catch (error) {
      setMassTimeErrors(error.errors || {})
      setNotice({ type: 'error', message: error.message || 'Unable to save the Mass time.' })
    } finally {
      setIsSavingMassTime(false)
    }
  }

  async function removeMassTime(id) {
    if (!window.confirm('Delete this Mass time?')) {
      return
    }

    dismissNotice()

    try {
      const payload = await deleteMassTime(id)
      await refreshMassTimes()

      if (selectedMassTimeId === id) {
        startNewMassTime()
      }

      setNotice({ type: 'success', message: payload.message || 'Mass time deleted successfully.' })
    } catch (error) {
      setNotice({ type: 'error', message: error.message || 'Unable to delete the Mass time.' })
    }
  }

  return (
    <div className="admin-page-grid two-col">
      <div className="admin-page-grid">
        <Notice notice={notice} onDismiss={dismissNotice} />

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Mass Time Management</h2>
              <p>Maintain the published worship timetable with proper clash checks.</p>
            </div>
            <button className="btn-primary" type="button" onClick={startNewMassTime}>New Mass Time</button>
          </div>

          <div className="admin-data-table">
            {massTimes.map(item => (
              <div key={item.id} className="admin-row">
                <div>
                  <strong>{item.day}</strong>
                  <span>{formatTime(item.start_time)}{item.language ? ` • ${item.language}` : ''}</span>
                </div>
                <div>
                  <small>{item.location || 'Location not set'}</small>
                  <span className="admin-badge">{item.status}</span>
                </div>
                <div className="admin-row-actions">
                  <button type="button" onClick={() => editMassTime(item.id)}>Edit</button>
                  <button type="button" className="danger" onClick={() => removeMassTime(item.id)}>Delete</button>
                </div>
              </div>
            ))}
            {!massTimes.length ? <p className="admin-empty">No Mass times found for this page.</p> : null}
          </div>

          <div className="admin-pagination">
            <button className="btn-outline" type="button" onClick={() => refreshMassTimes(Math.max(1, massTimeMeta.current_page - 1))} disabled={massTimeMeta.current_page <= 1}>
              Previous
            </button>
            <span>Page {massTimeMeta.current_page} of {massTimeMeta.last_page}</span>
            <button className="btn-outline" type="button" onClick={() => refreshMassTimes(Math.min(massTimeMeta.last_page, massTimeMeta.current_page + 1))} disabled={massTimeMeta.current_page >= massTimeMeta.last_page}>
              Next
            </button>
          </div>
        </article>
      </div>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>{selectedMassTimeId ? 'Edit Mass Time' : 'Create Mass Time'}</h2>
            <p>{isLoadingMassTimeEditor ? 'Loading Mass time...' : 'All clashes are checked by the backend.'}</p>
          </div>
        </div>

        <form className="admin-form" onSubmit={submitMassTime}>
          <label>
            <span>Day</span>
            <select name="day" value={massTimeForm.day} onChange={handleMassTimeChange} required>
              <option value="">Select a day</option>
              {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
            <FieldError errors={massTimeErrors} name="day" />
          </label>

          <label>
            <span>Start time</span>
            <input type="time" name="start_time" value={massTimeForm.start_time} onChange={handleMassTimeChange} required />
            <FieldError errors={massTimeErrors} name="start_time" />
          </label>

          <div className="admin-panel">
            <strong>Existing Mass times</strong>
            <ul>
              {massPreview.length ? massPreview.map(item => (
                <li key={item.id}>
                  {item.language ? `${item.language} Mass` : 'Mass'} ({formatTime(item.start_time)})
                </li>
              )) : <li>No existing Mass times for this selection.</li>}
            </ul>
          </div>

          <label>
            <span>Location</span>
            <input name="location" value={massTimeForm.location} onChange={handleMassTimeChange} placeholder="e.g. Cathedral" />
            <FieldError errors={massTimeErrors} name="location" />
          </label>

          <label>
            <span>Language</span>
            <input name="language" value={massTimeForm.language} onChange={handleMassTimeChange} placeholder="e.g. English" />
            <FieldError errors={massTimeErrors} name="language" />
          </label>

          <label>
            <span>Notes</span>
            <textarea name="notes" rows="4" value={massTimeForm.notes} onChange={handleMassTimeChange} />
            <FieldError errors={massTimeErrors} name="notes" />
          </label>

          <label>
            <span>Status</span>
            <select name="status" value={massTimeForm.status} onChange={handleMassTimeChange}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            <FieldError errors={massTimeErrors} name="status" />
          </label>

          <div className="admin-actions">
            <button className="btn-primary" type="submit" disabled={isSavingMassTime}>
              {isSavingMassTime ? 'Saving...' : selectedMassTimeId ? 'Update Mass Time' : 'Create Mass Time'}
            </button>
            <button className="btn-outline" type="button" onClick={startNewMassTime}>Reset</button>
          </div>
        </form>
      </article>
    </div>
  )
}
