import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FeedbackDialog from '../../components/FeedbackDialog'
import { createEvent, deleteEvent, getEvent, listEvents, listEventsByDate, updateEvent } from '../../lib/admin'
import { hasErrors, requireField, validateDateOrder, validateMaxLength, validateTimeOrder } from '../../lib/validation'

const emptyEventForm = {
  title: '',
  description: '',
  start_date: '',
  start_time: '',
  end_date: '',
  end_time: '',
  location: '',
  status: 'published',
  category: '',
  all_day: false,
}

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

function formatTime(value) {
  if (!value) {
    return 'Not set'
  }

  return value.slice(0, 5)
}

function formatDateTime(date, time) {
  if (!date) {
    return 'Not scheduled'
  }

  return `${formatDate(date)}${time ? ` at ${formatTime(time)}` : ''}`
}

function FieldError({ errors, name }) {
  if (!errors?.[name]?.[0]) {
    return null
  }

  return <p className="admin-field-error">{errors[name][0]}</p>
}

export default function AdminEventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [events, setEvents] = useState([])
  const [eventPreview, setEventPreview] = useState([])
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [eventForm, setEventForm] = useState(emptyEventForm)
  const [eventErrors, setEventErrors] = useState({})
  const [dialogState, setDialogState] = useState({
    open: false,
    tone: 'neutral',
    title: '',
    message: '',
  })
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [isSavingEvent, setIsSavingEvent] = useState(false)
  const [isLoadingEventEditor, setIsLoadingEventEditor] = useState(false)

  useEffect(() => {
    let ignore = false

    async function loadEventsData() {
      const payload = await listEvents()

      if (!ignore) {
        setEvents(payload.events || [])
      }
    }

    loadEventsData()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const editId = searchParams.get('edit')

    if (!editId) {
      return
    }

    editEvent(Number(editId))
  }, [searchParams])

  useEffect(() => {
    let ignore = false

    async function loadPreview() {
      if (!eventForm.start_date) {
        setEventPreview([])
        return
      }

      try {
        const data = await listEventsByDate(eventForm.start_date)

        if (!ignore) {
          setEventPreview((data || []).filter(item => item.id !== selectedEventId))
        }
      } catch {
        if (!ignore) {
          setEventPreview([])
        }
      }
    }

    loadPreview()

    return () => {
      ignore = true
    }
  }, [eventForm.start_date, selectedEventId])

  function closeDialog() {
    setDialogState(current => ({ ...current, open: false }))
  }

  function openDialog(tone, title, message) {
    setDialogState({ open: true, tone, title, message })
  }

  async function refreshEvents() {
    const payload = await listEvents()
    setEvents(payload.events || [])
  }

  function handleEventChange(event) {
    const { name, value, type, checked } = event.target
    const nextForm = {
      ...eventForm,
      [name]: type === 'checkbox' ? checked : value,
    }

    if (name === 'all_day') {
      nextForm.start_time = checked ? '00:00' : eventForm.start_time
      nextForm.end_time = checked ? '23:59' : eventForm.end_time
    }

    setEventForm(nextForm)
    setEventErrors(current => ({
      ...current,
      ...validateEventLiveFields(nextForm, name),
    }))
  }

  async function editEvent(id) {
    setIsLoadingEventEditor(true)

    try {
      const payload = await getEvent(id)
      const item = payload.event

      setSelectedEventId(id)
      setEventForm({
        title: item.title || '',
        description: item.description || '',
        start_date: item.start_date || '',
        start_time: item.start_time ? item.start_time.slice(0, 5) : '',
        end_date: item.end_date || '',
        end_time: item.end_time ? item.end_time.slice(0, 5) : '',
        location: item.location || '',
        status: item.status || 'draft',
        category: item.category || '',
        all_day: item.start_time === '00:00:00' && item.end_time === '23:59:00',
      })
      setEventErrors({})
      setSearchParams({ edit: String(id) })
    } catch (error) {
      openDialog('error', 'Unable to load event', error.message || 'The selected event could not be opened.')
    } finally {
      setIsLoadingEventEditor(false)
    }
  }

  function startNewEvent() {
    setSelectedEventId(null)
    setEventForm(emptyEventForm)
    setEventErrors({})
    setSearchParams({})
  }

  async function submitEvent(event) {
    event.preventDefault()
    const validationErrors = validateEventForm()
    setEventErrors(validationErrors)

    if (hasErrors(validationErrors)) {
      openDialog('error', 'Please check the event form', 'Fix the highlighted fields before saving this event.')
      return
    }

    setIsSavingEvent(true)

    try {
      const payload = selectedEventId
        ? await updateEvent(selectedEventId, eventForm)
        : await createEvent(eventForm)

      await refreshEvents()
      startNewEvent()
      openDialog('success', 'Event saved successfully', payload.message || 'The event details have been saved and the form has been cleared.')
    } catch (error) {
      setEventErrors(error.errors || {})
      openDialog('error', 'Unable to save event', error.message || 'Please review the event details and try again.')
    } finally {
      setIsSavingEvent(false)
    }
  }

  function validateEventForm() {
    const nextErrors = {}

    requireField(nextErrors, 'title', eventForm.title, 'Title')
    validateMaxLength(nextErrors, 'title', eventForm.title, 255, 'Title')
    requireField(nextErrors, 'start_date', eventForm.start_date, 'Start date')
    requireField(nextErrors, 'start_time', eventForm.start_time, 'Start time')
    requireField(nextErrors, 'end_time', eventForm.end_time, 'End time')
    validateDateOrder(nextErrors, 'end_date', eventForm.start_date, eventForm.end_date, 'End date must be on or after the start date.')
    validateTimeOrder(nextErrors, 'end_time', eventForm.start_time, eventForm.end_time, 'End time must be after start time.')
    validateMaxLength(nextErrors, 'location', eventForm.location, 255, 'Location')
    validateMaxLength(nextErrors, 'category', eventForm.category, 255, 'Category')

    if (!['draft', 'published'].includes(eventForm.status)) {
      nextErrors.status = ['Select a valid status.']
    }

    return nextErrors
  }

  function validateEventLiveFields(form, changedName) {
    const nextErrors = {}

    if (changedName === 'title') {
      requireField(nextErrors, 'title', form.title, 'Title')
      validateMaxLength(nextErrors, 'title', form.title, 255, 'Title')
    }

    if (changedName === 'start_date') {
      requireField(nextErrors, 'start_date', form.start_date, 'Start date')
      validateDateOrder(nextErrors, 'end_date', form.start_date, form.end_date, 'End date must be on or after the start date.')
    }

    if (changedName === 'end_date') {
      validateDateOrder(nextErrors, 'end_date', form.start_date, form.end_date, 'End date must be on or after the start date.')
    }

    if (changedName === 'start_time' || changedName === 'all_day') {
      requireField(nextErrors, 'start_time', form.start_time, 'Start time')
      validateTimeOrder(nextErrors, 'end_time', form.start_time, form.end_time, 'End time must be after start time.')
    }

    if (changedName === 'end_time' || changedName === 'all_day') {
      requireField(nextErrors, 'end_time', form.end_time, 'End time')
      validateTimeOrder(nextErrors, 'end_time', form.start_time, form.end_time, 'End time must be after start time.')
    }

    if (changedName === 'location') {
      validateMaxLength(nextErrors, 'location', form.location, 255, 'Location')
    }

    if (changedName === 'category') {
      validateMaxLength(nextErrors, 'category', form.category, 255, 'Category')
    }

    if (changedName === 'status' && !['draft', 'published'].includes(form.status)) {
      nextErrors.status = ['Select a valid status.']
    }

    return {
      [changedName]: nextErrors[changedName],
      end_date: changedName === 'start_date' || changedName === 'end_date' ? nextErrors.end_date : undefined,
      end_time: ['start_time', 'end_time', 'all_day'].includes(changedName) ? nextErrors.end_time : undefined,
      start_time: ['start_time', 'all_day'].includes(changedName) ? nextErrors.start_time : undefined,
    }
  }

  async function removeEvent(id) {
    try {
      const payload = await deleteEvent(id)
      await refreshEvents()

      if (selectedEventId === id) {
        startNewEvent()
      }

      openDialog('success', 'Event deleted successfully', payload.message || 'The event has been removed from the schedule.')
    } catch (error) {
      openDialog('error', 'Unable to delete event', error.message || 'The event could not be deleted at this time.')
    } finally {
      setConfirmDeleteId(null)
    }
  }

  return (
    <div className="admin-page-grid two-col">
      <div className="admin-page-grid">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Event Management</h2>
              <p>Create, schedule, and publish events for the cathedral website.</p>
            </div>
            <button className="btn-primary" type="button" onClick={startNewEvent}>New Event</button>
          </div>

          <div className="admin-data-table">
            {events.map(item => (
              <div key={item.id} className="admin-row">
                <div>
                  <strong>{item.title}</strong>
                  <span>{formatDateTime(item.start_date, item.start_time)}</span>
                </div>
                <div>
                  <small>{item.location || 'Location not set'}</small>
                  <span className="admin-badge">{item.status}</span>
                </div>
                <div className="admin-row-actions">
                  <button type="button" onClick={() => editEvent(item.id)}>Edit</button>
                  <button type="button" className="danger" onClick={() => setConfirmDeleteId(item.id)}>Delete</button>
                </div>
              </div>
            ))}
            {!events.length ? <p className="admin-empty">No events have been added yet.</p> : null}
          </div>
        </article>
      </div>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>{selectedEventId ? 'Edit Event' : 'Create Event'}</h2>
            <p>{isLoadingEventEditor ? 'Loading event...' : 'Changes save directly to the backend.'}</p>
          </div>
        </div>

        <form className="admin-form" onSubmit={submitEvent} noValidate>
          <label>
            <span>Title</span>
            <input name="title" value={eventForm.title} onChange={handleEventChange} required aria-invalid={Boolean(eventErrors.title)} />
            <FieldError errors={eventErrors} name="title" />
          </label>

          <label>
            <span>Description</span>
            <textarea name="description" rows="4" value={eventForm.description} onChange={handleEventChange} aria-invalid={Boolean(eventErrors.description)} />
            <FieldError errors={eventErrors} name="description" />
          </label>

          <div className="admin-form-grid">
            <label>
              <span>Start date</span>
              <input type="date" name="start_date" value={eventForm.start_date} onChange={handleEventChange} required aria-invalid={Boolean(eventErrors.start_date)} />
              <FieldError errors={eventErrors} name="start_date" />
            </label>

            <label>
              <span>End date</span>
              <input type="date" name="end_date" value={eventForm.end_date} onChange={handleEventChange} aria-invalid={Boolean(eventErrors.end_date)} />
              <FieldError errors={eventErrors} name="end_date" />
            </label>
          </div>

          <label className="admin-checkbox">
            <input type="checkbox" name="all_day" checked={eventForm.all_day} onChange={handleEventChange} />
            <span>All-day event</span>
          </label>

          <div className="admin-form-grid">
            <label>
              <span>Start time</span>
              <input type="time" name="start_time" value={eventForm.start_time} onChange={handleEventChange} readOnly={eventForm.all_day} required aria-invalid={Boolean(eventErrors.start_time)} />
              <FieldError errors={eventErrors} name="start_time" />
            </label>

            <label>
              <span>End time</span>
              <input type="time" name="end_time" value={eventForm.end_time} onChange={handleEventChange} readOnly={eventForm.all_day} required aria-invalid={Boolean(eventErrors.end_time)} />
              <FieldError errors={eventErrors} name="end_time" />
            </label>
          </div>

          <div className="admin-panel">
            <strong>Existing events on this date</strong>
            <ul>
              {eventPreview.length ? eventPreview.map(item => (
                <li key={item.id}>
                  {item.title} ({formatTime(item.start_time)} - {formatTime(item.end_time)})
                </li>
              )) : <li>No other events on the selected date.</li>}
            </ul>
          </div>

          <div className="admin-form-grid">
            <label>
              <span>Location</span>
              <input name="location" value={eventForm.location} onChange={handleEventChange} aria-invalid={Boolean(eventErrors.location)} />
              <FieldError errors={eventErrors} name="location" />
            </label>

            <label>
              <span>Category</span>
              <input name="category" value={eventForm.category} onChange={handleEventChange} aria-invalid={Boolean(eventErrors.category)} />
              <FieldError errors={eventErrors} name="category" />
            </label>
          </div>

          <label>
            <span>Status</span>
            <select name="status" value={eventForm.status} onChange={handleEventChange} aria-invalid={Boolean(eventErrors.status)}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <FieldError errors={eventErrors} name="status" />
          </label>

          <div className="admin-actions">
            <button className="btn-primary" type="submit" disabled={isSavingEvent}>
              {isSavingEvent ? 'Saving...' : selectedEventId ? 'Update Event' : 'Create Event'}
            </button>
            <button className="btn-outline" type="button" onClick={startNewEvent}>Reset</button>
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
        title="Delete this event?"
        message="This action will permanently remove the event from the admin panel and website listings."
        confirmLabel="Delete Event"
        cancelLabel="Keep Event"
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => removeEvent(confirmDeleteId)}
      />
    </div>
  )
}
