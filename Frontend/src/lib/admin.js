import { getBackendUrl } from './auth'

let csrfToken = null

async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return {}
}

async function ensureCsrfToken() {
  if (csrfToken) {
    return csrfToken
  }

  const response = await fetch(getBackendUrl('/auth-api/csrf-token'), {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  const payload = await parseJsonResponse(response)

  if (!response.ok || !payload.csrf_token) {
    throw new Error('Unable to start a secure admin session with the backend.')
  }

  csrfToken = payload.csrf_token
  return csrfToken
}

function normalizeError(payload, fallbackMessage) {
  if (payload?.errors && typeof payload.errors === 'object') {
    return {
      message: payload.message || fallbackMessage,
      errors: payload.errors,
    }
  }

  return {
    message: payload?.message || fallbackMessage,
    errors: {},
  }
}

async function adminRequest(path, { method = 'GET', body } = {}) {
  const upperMethod = method.toUpperCase()
  const headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }

  if (!['GET', 'HEAD'].includes(upperMethod)) {
    const token = await ensureCsrfToken()
    headers['X-CSRF-TOKEN'] = token
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(getBackendUrl(path), {
    method: upperMethod,
    credentials: 'include',
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const payload = await parseJsonResponse(response)

  if (!response.ok) {
    if (response.status === 419) {
      csrfToken = null
    }

    throw normalizeError(payload, 'The admin request could not be completed.')
  }

  return payload
}

export function listEvents() {
  return adminRequest('/admin/events')
}

export function getEvent(id) {
  return adminRequest(`/admin/events/${id}/edit`)
}

export function createEvent(data) {
  return adminRequest('/admin/events', { method: 'POST', body: data })
}

export function updateEvent(id, data) {
  return adminRequest(`/admin/events/${id}`, { method: 'PUT', body: data })
}

export function deleteEvent(id) {
  return adminRequest(`/admin/events/${id}`, { method: 'DELETE' })
}

export function listEventsByDate(date) {
  const params = new URLSearchParams({ date })
  return adminRequest(`/admin/events/by-date?${params.toString()}`)
}

export function listMassTimes(page = 1) {
  const params = new URLSearchParams({ page: String(page) })
  return adminRequest(`/admin/mass-times?${params.toString()}`)
}

export function getMassTime(id) {
  return adminRequest(`/admin/mass-times/${id}/edit`)
}

export function createMassTime(data) {
  return adminRequest('/admin/mass-times', { method: 'POST', body: data })
}

export function updateMassTime(id, data) {
  return adminRequest(`/admin/mass-times/${id}`, { method: 'PUT', body: data })
}

export function deleteMassTime(id) {
  return adminRequest(`/admin/mass-times/${id}`, { method: 'DELETE' })
}

export function listMassTimesByDay(day, location = '') {
  const params = new URLSearchParams()

  if (day) {
    params.set('day', day)
  }

  if (location) {
    params.set('location', location)
  }

  return adminRequest(`/admin/mass-times/by-day?${params.toString()}`)
}

export function listRegistrations(page = 1) {
  const params = new URLSearchParams({ page: String(page) })
  return adminRequest(`/admin/parish-registrations?${params.toString()}`)
}

export function getRegistration(id) {
  return adminRequest(`/admin/parish-registrations/${id}`)
}

export function updateRegistration(id, data) {
  return adminRequest(`/admin/parish-registrations/${id}`, { method: 'PUT', body: data })
}

export function deleteRegistration(id) {
  return adminRequest(`/admin/parish-registrations/${id}`, { method: 'DELETE' })
}
