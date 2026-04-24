import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FeedbackDialog from '../../components/FeedbackDialog'
import { createNewsletter, deleteNewsletter, getNewsletter, listNewsletters, updateNewsletter } from '../../lib/admin'
import { getBackendUrl } from '../../lib/auth'
import { hasErrors, requireField, validateDateNotFuture, validateMaxLength } from '../../lib/validation'

const emptyNewsletterForm = {
  title: '',
  publication_date: '',
  description: '',
  status: 'published',
}

function FieldError({ errors, name }) {
  if (!errors?.[name]?.[0]) {
    return null
  }

  return <p className="admin-field-error">{errors[name][0]}</p>
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

function formatBytes(value) {
  if (!value) {
    return 'Unknown size'
  }

  const mb = value / 1024 / 1024
  return `${mb.toFixed(mb >= 10 ? 0 : 1)} MB`
}

function fileUrl(path) {
  return getBackendUrl(path || '')
}

function isPdfFile(file) {
  return file?.type === 'application/pdf' || file?.name?.toLowerCase().endsWith('.pdf')
}

export default function AdminNewslettersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const fileInputRef = useRef(null)
  const [newsletters, setNewsletters] = useState([])
  const [newsletterMeta, setNewsletterMeta] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [selectedNewsletterId, setSelectedNewsletterId] = useState(null)
  const [newsletterForm, setNewsletterForm] = useState(emptyNewsletterForm)
  const [selectedFile, setSelectedFile] = useState(null)
  const [newsletterErrors, setNewsletterErrors] = useState({})
  const [isSavingNewsletter, setIsSavingNewsletter] = useState(false)
  const [isLoadingNewsletterEditor, setIsLoadingNewsletterEditor] = useState(false)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [newsletterSearch, setNewsletterSearch] = useState('')
  const [newsletterStatusFilter, setNewsletterStatusFilter] = useState('')
  const [dialogState, setDialogState] = useState({
    open: false,
    tone: 'neutral',
    title: '',
    message: '',
  })

  useEffect(() => {
    let ignore = false

    async function loadNewsletters() {
      const payload = await listNewsletters(1)

      if (!ignore) {
        setNewsletters(payload.newsletters || [])
        setNewsletterMeta(payload.meta || { current_page: 1, last_page: 1, total: 0 })
      }
    }

    loadNewsletters()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const editId = searchParams.get('edit')

    if (!editId) {
      return
    }

    let ignore = false

    async function loadNewsletterForEdit() {
      setIsLoadingNewsletterEditor(true)

      try {
        const id = Number(editId)
        const payload = await getNewsletter(id)
        const item = payload.newsletter

        if (!ignore) {
          setSelectedNewsletterId(id)
          setNewsletterForm({
            title: item.title || '',
            publication_date: item.publication_date || '',
            description: item.description || '',
            status: item.status || 'published',
          })
          setSelectedFile(null)
          setNewsletterErrors({})

          if (fileInputRef.current) {
            fileInputRef.current.value = ''
          }
        }
      } catch (error) {
        if (!ignore) {
          openDialog('error', 'Unable to load newsletter', error.message || 'The selected newsletter could not be opened.')
        }
      } finally {
        if (!ignore) {
          setIsLoadingNewsletterEditor(false)
        }
      }
    }

    loadNewsletterForEdit()

    return () => {
      ignore = true
    }
  }, [searchParams])

  const selectedNewsletter = newsletters.find(item => item.id === selectedNewsletterId)

  function closeDialog() {
    setDialogState(current => ({ ...current, open: false }))
  }

  function openDialog(tone, title, message) {
    setDialogState({ open: true, tone, title, message })
  }

  async function refreshNewsletters(page = newsletterMeta.current_page || 1) {
    const payload = await listNewsletters(page)
    setNewsletters(payload.newsletters || [])
    setNewsletterMeta(payload.meta || { current_page: page, last_page: 1, total: 0 })
  }

  function startNewNewsletter() {
    setSelectedNewsletterId(null)
    setNewsletterForm(emptyNewsletterForm)
    setSelectedFile(null)
    setNewsletterErrors({})
    setSearchParams({})

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  async function editNewsletter(id) {
    setIsLoadingNewsletterEditor(true)

    try {
      const payload = await getNewsletter(id)
      const item = payload.newsletter

      setSelectedNewsletterId(id)
      setNewsletterForm({
        title: item.title || '',
        publication_date: item.publication_date || '',
        description: item.description || '',
        status: item.status || 'published',
      })
      setSelectedFile(null)
      setNewsletterErrors({})
      setSearchParams({ edit: String(id) })

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      openDialog('error', 'Unable to load newsletter', error.message || 'The selected newsletter could not be opened.')
    } finally {
      setIsLoadingNewsletterEditor(false)
    }
  }

  function handleNewsletterChange(event) {
    const { name, value } = event.target
    const nextForm = {
      ...newsletterForm,
      [name]: value,
    }

    setNewsletterForm(nextForm)
    setNewsletterErrors(current => ({
      ...current,
      ...validateNewsletterLiveFields(nextForm, name),
    }))
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)

    if (!file) {
      setNewsletterErrors(current => ({
        ...current,
        pdf: selectedNewsletterId ? undefined : ['Please upload a newsletter PDF.'],
      }))
      return
    }

    if (!isPdfFile(file)) {
      setNewsletterErrors(current => ({
        ...current,
        pdf: ['The newsletter file must be a PDF.'],
      }))
      return
    }

    if (file.size > 20 * 1024 * 1024) {
      setNewsletterErrors(current => ({
        ...current,
        pdf: ['The newsletter PDF must be 20MB or smaller.'],
      }))
      return
    }

    setNewsletterErrors(current => ({ ...current, pdf: undefined }))
  }

  function validateNewsletterForm() {
    const nextErrors = {}

    requireField(nextErrors, 'title', newsletterForm.title, 'Title')
    validateMaxLength(nextErrors, 'title', newsletterForm.title, 255, 'Title')
    requireField(nextErrors, 'publication_date', newsletterForm.publication_date, 'Publication date')
    validateDateNotFuture(nextErrors, 'publication_date', newsletterForm.publication_date, 'Publication date')
    validateMaxLength(nextErrors, 'description', newsletterForm.description, 2000, 'Description')

    if (!['draft', 'published'].includes(newsletterForm.status)) {
      nextErrors.status = ['Select a valid status.']
    }

    if (!selectedNewsletterId && !selectedFile) {
      nextErrors.pdf = ['Please upload a newsletter PDF.']
    }

    if (selectedFile && !isPdfFile(selectedFile)) {
      nextErrors.pdf = ['The newsletter file must be a PDF.']
    }

    if (selectedFile && selectedFile.size > 20 * 1024 * 1024) {
      nextErrors.pdf = ['The newsletter PDF must be 20MB or smaller.']
    }

    return nextErrors
  }

  function validateNewsletterLiveFields(form, changedName) {
    const nextErrors = {}

    if (changedName === 'title') {
      requireField(nextErrors, 'title', form.title, 'Title')
      validateMaxLength(nextErrors, 'title', form.title, 255, 'Title')
    }

    if (changedName === 'publication_date') {
      requireField(nextErrors, 'publication_date', form.publication_date, 'Publication date')
      validateDateNotFuture(nextErrors, 'publication_date', form.publication_date, 'Publication date')
    }

    if (changedName === 'description') {
      validateMaxLength(nextErrors, 'description', form.description, 2000, 'Description')
    }

    if (changedName === 'status' && !['draft', 'published'].includes(form.status)) {
      nextErrors.status = ['Select a valid status.']
    }

    return {
      [changedName]: nextErrors[changedName],
    }
  }

  async function submitNewsletter(event) {
    event.preventDefault()
    const validationErrors = validateNewsletterForm()
    setNewsletterErrors(validationErrors)

    if (hasErrors(validationErrors)) {
      openDialog('error', 'Please check the newsletter form', 'Fix the highlighted fields before saving this newsletter.')
      return
    }

    setIsSavingNewsletter(true)

    const payload = new FormData()
    payload.append('title', newsletterForm.title)
    payload.append('publication_date', newsletterForm.publication_date)
    payload.append('description', newsletterForm.description || '')
    payload.append('status', newsletterForm.status)

    if (selectedFile) {
      payload.append('pdf', selectedFile)
    }

    try {
      const response = selectedNewsletterId
        ? await updateNewsletter(selectedNewsletterId, payload)
        : await createNewsletter(payload)

      await refreshNewsletters()
      startNewNewsletter()
      openDialog('success', 'Newsletter saved successfully', response.message || 'The newsletter has been saved.')
    } catch (error) {
      setNewsletterErrors(error.errors || {})
      openDialog('error', 'Unable to save newsletter', error.message || 'Please review the newsletter details and try again.')
    } finally {
      setIsSavingNewsletter(false)
    }
  }

  async function removeNewsletter(id) {
    try {
      const payload = await deleteNewsletter(id)
      await refreshNewsletters()

      if (selectedNewsletterId === id) {
        startNewNewsletter()
      }

      openDialog('success', 'Newsletter deleted successfully', payload.message || 'The newsletter has been removed.')
    } catch (error) {
      openDialog('error', 'Unable to delete newsletter', error.message || 'The newsletter could not be deleted at this time.')
    } finally {
      setConfirmDeleteId(null)
    }
  }

  const filteredNewsletters = newsletters.filter(item => {
    const query = newsletterSearch.trim().toLowerCase()
    const matchesQuery = query
      ? `${item.title} ${item.description || ''} ${item.original_filename || ''}`.toLowerCase().includes(query)
      : true
    const matchesStatus = newsletterStatusFilter ? item.status === newsletterStatusFilter : true

    return matchesQuery && matchesStatus
  })

  return (
    <div className="admin-page-grid two-col">
      <div className="admin-page-grid">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Newsletter Library</h2>
              <p>Upload parish newsletter PDFs and control what appears publicly.</p>
            </div>
            <button className="btn-primary" type="button" onClick={startNewNewsletter}>New Newsletter</button>
          </div>

          <div className="admin-filter-bar">
            <input
              type="search"
              className="admin-filter-input"
              placeholder="Search newsletters..."
              value={newsletterSearch}
              onChange={event => setNewsletterSearch(event.target.value)}
            />
            <select className="admin-filter-select" value={newsletterStatusFilter} onChange={event => setNewsletterStatusFilter(event.target.value)}>
              <option value="">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="admin-data-table">
            {filteredNewsletters.map(item => (
              <div key={item.id} className="admin-row">
                <div>
                  <strong>{item.title}</strong>
                  <span>{formatDate(item.publication_date)} • {formatBytes(item.file_size)}</span>
                </div>
                <div>
                  <small>{item.original_filename}</small>
                  <span className="admin-badge">{item.status}</span>
                </div>
                <div className="admin-row-actions">
                  <a href={fileUrl(item.view_url)} target="_blank" rel="noreferrer">Open</a>
                  <a href={fileUrl(item.download_url)}>Download</a>
                  <button type="button" onClick={() => editNewsletter(item.id)}>Edit</button>
                  <button type="button" className="danger" onClick={() => setConfirmDeleteId(item.id)}>Delete</button>
                </div>
              </div>
            ))}
            {!filteredNewsletters.length ? <p className="admin-empty">{newsletters.length ? 'No newsletters match the current search or filters.' : 'No newsletters have been uploaded yet.'}</p> : null}
          </div>

          <div className="admin-pagination">
            <button className="btn-outline" type="button" onClick={() => refreshNewsletters(Math.max(1, newsletterMeta.current_page - 1))} disabled={newsletterMeta.current_page <= 1}>
              Previous
            </button>
            <span>Page {newsletterMeta.current_page} of {newsletterMeta.last_page}</span>
            <button className="btn-outline" type="button" onClick={() => refreshNewsletters(Math.min(newsletterMeta.last_page, newsletterMeta.current_page + 1))} disabled={newsletterMeta.current_page >= newsletterMeta.last_page}>
              Next
            </button>
          </div>
        </article>
      </div>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>{selectedNewsletterId ? 'Edit Newsletter' : 'Create Newsletter'}</h2>
            <p>{isLoadingNewsletterEditor ? 'Loading newsletter...' : selectedNewsletterId ? 'Update the title, date, status, or replace the PDF.' : 'Add a new PDF to the public newsletter archive.'}</p>
          </div>
        </div>

        <form className="admin-form" onSubmit={submitNewsletter} noValidate>
          <label>
            <span>Title</span>
            <input name="title" value={newsletterForm.title} onChange={handleNewsletterChange} aria-invalid={Boolean(newsletterErrors.title)} />
            <FieldError errors={newsletterErrors} name="title" />
          </label>

          <label>
            <span>Publication date</span>
            <input type="date" name="publication_date" value={newsletterForm.publication_date} onChange={handleNewsletterChange} aria-invalid={Boolean(newsletterErrors.publication_date)} />
            <FieldError errors={newsletterErrors} name="publication_date" />
          </label>

          <label>
            <span>Description</span>
            <textarea name="description" rows="4" value={newsletterForm.description} onChange={handleNewsletterChange} aria-invalid={Boolean(newsletterErrors.description)} />
            <FieldError errors={newsletterErrors} name="description" />
          </label>

          <label>
            <span>Status</span>
            <select name="status" value={newsletterForm.status} onChange={handleNewsletterChange} aria-invalid={Boolean(newsletterErrors.status)}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <FieldError errors={newsletterErrors} name="status" />
          </label>

          <label>
            <span>{selectedNewsletterId ? 'Replace PDF' : 'PDF file'}</span>
            <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" onChange={handleFileChange} aria-invalid={Boolean(newsletterErrors.pdf)} />
            <FieldError errors={newsletterErrors} name="pdf" />
          </label>

          {selectedFile ? (
            <div className="admin-panel">
              <strong>Selected PDF</strong>
              <p>{selectedFile.name} • {formatBytes(selectedFile.size)}</p>
            </div>
          ) : null}

          {selectedNewsletter && !selectedFile ? (
            <div className="admin-panel">
              <strong>Current PDF</strong>
              <p>{selectedNewsletter.original_filename} - {formatBytes(selectedNewsletter.file_size)}</p>
            </div>
          ) : null}

          <div className="admin-actions">
            <button className="btn-primary" type="submit" disabled={isSavingNewsletter}>
              {isSavingNewsletter ? 'Saving...' : selectedNewsletterId ? 'Update Newsletter' : 'Create Newsletter'}
            </button>
            <button className="btn-outline" type="button" onClick={startNewNewsletter}>Reset</button>
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
        title="Delete this newsletter?"
        message="This will permanently remove the newsletter record and its uploaded PDF."
        confirmLabel="Delete Newsletter"
        cancelLabel="Keep Newsletter"
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => removeNewsletter(confirmDeleteId)}
      />
    </div>
  )
}
