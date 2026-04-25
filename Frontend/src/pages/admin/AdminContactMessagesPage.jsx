import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import FeedbackDialog from '../../components/FeedbackDialog'
import { deleteContactMessage, getContactMessage, listContactMessages } from '../../lib/admin'

function formatDateTime(value) {
  if (!value) {
    return 'Unknown time'
  }

  return new Date(value).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function truncate(text, length = 110) {
  if (!text) {
    return 'No message content.'
  }

  return text.length > length ? `${text.slice(0, length).trim()}...` : text
}

export default function AdminContactMessagesPage() {
  const { user } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()
  const [messages, setMessages] = useState([])
  const [messageMeta, setMessageMeta] = useState({ current_page: 1, last_page: 1, total: 0 })
  const [selectedMessageId, setSelectedMessageId] = useState(null)
  const [messageDetail, setMessageDetail] = useState(null)
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [messageSearch, setMessageSearch] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  useEffect(() => {
    let ignore = false

    async function loadMessages(page = 1) {
      setIsLoadingMessages(true)
      setErrorMessage('')

      try {
        const payload = await listContactMessages(page)

        if (ignore) {
          return
        }

        const items = payload.messages || []
        setMessages(items)
        setMessageMeta(payload.meta || { current_page: page, last_page: 1, total: 0 })

        const querySelected = searchParams.get('message')
        const nextId = querySelected ? Number(querySelected) : items[0]?.id || null
        setSelectedMessageId(nextId)

        if (nextId) {
          setSearchParams({ message: String(nextId) })
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || 'Unable to load contact messages.')
        }
      } finally {
        if (!ignore) {
          setIsLoadingMessages(false)
        }
      }
    }

    loadMessages()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const selected = searchParams.get('message')

    if (selected) {
      setSelectedMessageId(Number(selected))
    }
  }, [searchParams])

  useEffect(() => {
    let ignore = false

    async function loadMessageDetail() {
      if (!selectedMessageId) {
        setMessageDetail(null)
        return
      }

      setIsLoadingDetail(true)
      setErrorMessage('')

      try {
        const payload = await getContactMessage(selectedMessageId)

        if (!ignore) {
          setMessageDetail(payload.message || null)
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || 'Unable to load the selected message.')
        }
      } finally {
        if (!ignore) {
          setIsLoadingDetail(false)
        }
      }
    }

    loadMessageDetail()

    return () => {
      ignore = true
    }
  }, [selectedMessageId])

  async function goToPage(page) {
    setIsLoadingMessages(true)
    setErrorMessage('')

    try {
      const payload = await listContactMessages(page)
      const items = payload.messages || []
      setMessages(items)
      setMessageMeta(payload.meta || { current_page: page, last_page: 1, total: 0 })

      const nextId = items[0]?.id || null
      setSelectedMessageId(nextId)

      if (nextId) {
        setSearchParams({ message: String(nextId) })
      } else {
        setSearchParams({})
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load contact messages.')
    } finally {
      setIsLoadingMessages(false)
    }
  }

  async function removeMessage(id) {
    try {
      await deleteContactMessage(id)
      const payload = await listContactMessages(messageMeta.current_page)
      const items = payload.messages || []
      const nextSelectedId = items.find(item => item.id !== id)?.id || items[0]?.id || null

      setMessages(items)
      setMessageMeta(payload.meta || { current_page: 1, last_page: 1, total: 0 })
      setSelectedMessageId(nextSelectedId)
      setMessageDetail(nextSelectedId ? null : null)

      if (nextSelectedId) {
        setSearchParams({ message: String(nextSelectedId) })
      } else {
        setSearchParams({})
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to delete the selected message.')
    } finally {
      setConfirmDeleteId(null)
    }
  }

  const filteredMessages = messages.filter(item => {
    const query = messageSearch.trim().toLowerCase()

    if (!query) {
      return true
    }

    return `${item.subject} ${item.name} ${item.email} ${item.message || ''}`.toLowerCase().includes(query)
  })

  return (
    <div className="admin-page-grid two-col">
      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>Contact Messages</h2>
            <p>{user?.is_main_admin ? 'Review enquiries submitted through the public Contact Us form.' : 'Review enquiries routed to your group from the public Contact Us form.'}</p>
          </div>
          <div className="admin-user-meta">
            <span>{messageMeta.total || 0}</span>
            <small>Total messages</small>
          </div>
        </div>

        <div className="admin-filter-bar">
          <input
            type="search"
            className="admin-filter-input"
            placeholder="Search messages..."
            value={messageSearch}
            onChange={event => setMessageSearch(event.target.value)}
          />
        </div>

        {errorMessage ? <p className="admin-field-error">{errorMessage}</p> : null}
        {isLoadingMessages ? <p className="admin-loading">Loading messages...</p> : null}

        {!isLoadingMessages ? (
          <div className="admin-data-table">
            {filteredMessages.map(item => (
              <button
                key={item.id}
                type="button"
                className={`admin-row admin-row-stack ${selectedMessageId === item.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedMessageId(item.id)
                  setSearchParams({ message: String(item.id) })
                }}
              >
                <div>
                  <strong>{item.subject}</strong>
                  <span>{item.name} • {item.email}{item.group_name ? ` • ${item.group_name}` : ''}</span>
                </div>
                <div>
                  <small>{formatDateTime(item.created_at)}</small>
                  <span>{item.category ? `${item.category} • ` : ''}{truncate(item.message)}</span>
                </div>
              </button>
            ))}
            {!filteredMessages.length ? <p className="admin-empty">{messages.length ? 'No messages match the current search.' : 'No contact messages have been submitted yet.'}</p> : null}
          </div>
        ) : null}

        <div className="admin-pagination">
          <button
            className="btn-outline"
            type="button"
            onClick={() => goToPage(Math.max(1, messageMeta.current_page - 1))}
            disabled={messageMeta.current_page <= 1}
          >
            Previous
          </button>
          <span>Page {messageMeta.current_page} of {messageMeta.last_page}</span>
          <button
            className="btn-outline"
            type="button"
            onClick={() => goToPage(Math.min(messageMeta.last_page, messageMeta.current_page + 1))}
            disabled={messageMeta.current_page >= messageMeta.last_page}
          >
            Next
          </button>
        </div>
      </article>

      <article className="admin-surface">
        <div className="admin-section-head">
          <div>
            <h2>Message Detail</h2>
            <p>{isLoadingDetail ? 'Loading message...' : 'Open a message to read the full enquiry.'}</p>
          </div>
          {user?.is_main_admin && messageDetail ? (
            <button className="btn-outline admin-danger-button" type="button" onClick={() => setConfirmDeleteId(messageDetail.id)}>
              Delete Message
            </button>
          ) : null}
        </div>

        {!messageDetail && !isLoadingDetail ? <p className="admin-empty">Select a contact message to view it here.</p> : null}

        {messageDetail ? (
          <div className="admin-detail-grid">
            <div className="admin-detail-card">
              <span>From</span>
              <strong>{messageDetail.name}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Received</span>
              <strong>{formatDateTime(messageDetail.created_at)}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Email</span>
              <strong>{messageDetail.email}</strong>
            </div>
            <div className="admin-detail-card">
              <span>Phone</span>
              <strong>{messageDetail.phone || 'Not provided'}</strong>
            </div>

            <article className="admin-detail-block admin-detail-block-full">
              <h3>Subject</h3>
              <p>{messageDetail.subject}</p>
            </article>

            <article className="admin-detail-block">
              <h3>Category</h3>
              <p>{messageDetail.category || 'General'}</p>
            </article>

            <article className="admin-detail-block">
              <h3>Routed Group</h3>
              <p>{messageDetail.group_name || 'Main parish inbox only'}</p>
            </article>

            <article className="admin-detail-block admin-detail-block-full">
              <h3>Message</h3>
              <p className="admin-message-copy">{messageDetail.message}</p>
            </article>
          </div>
        ) : null}
      </article>

      <FeedbackDialog
        open={confirmDeleteId !== null}
        tone="neutral"
        variant="confirm"
        title="Delete this message?"
        message="This will permanently remove the selected contact message."
        confirmLabel="Delete Message"
        cancelLabel="Keep Message"
        onClose={() => setConfirmDeleteId(null)}
        onConfirm={() => removeMessage(confirmDeleteId)}
      />
    </div>
  )
}
