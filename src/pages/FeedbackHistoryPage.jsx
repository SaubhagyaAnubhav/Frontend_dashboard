

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { useProfile } from '@/hooks'

const FeedbackHistoryPage = () => {
  const navigate = useNavigate()
  const profile = useProfile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [feedbackList, setFeedbackList] = useState(() => {

    const stored = localStorage.getItem('hintro_feedback')
    return stored ? JSON.parse(stored) : []
  })

  const handleDelete = (id) => {
    const updated = feedbackList.filter((item) => item.id !== id)
    setFeedbackList(updated)
    localStorage.setItem('hintro_feedback', JSON.stringify(updated))
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">

      <Sidebar className="hidden lg:flex" />


      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar onClose={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}


      <div className="flex flex-1 flex-col overflow-hidden">

        <Header onMenuClick={() => setMobileMenuOpen(true)} profile={profile} />


        <main className="flex-1 overflow-y-auto bg-white">

          <div className="border-b border-neutral-200 bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">Feedback History</h1>
                <p className="mt-1 text-sm text-neutral-600">View all your submitted feedback</p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Back to Dashboard
              </button>
            </div>
          </div>


          <div className="p-6">
            {feedbackList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                  <svg
                    className="h-8 w-8 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-base font-semibold text-neutral-900">No Feedback Yet</h3>
                <p className="mb-6 max-w-sm text-center text-sm text-neutral-600">
                  Your submitted feedback will appear here
                </p>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {feedbackList.map((item) => (
                  <FeedbackCard key={item.id} feedback={item} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}


const FeedbackCard = ({ feedback, onDelete }) => {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-5 w-5 ${
                star <= feedback.rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
              }`}
              fill={star <= feedback.rating ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ))}
        </div>
        <button
          onClick={() => onDelete(feedback.id)}
          className="hover:text-error-500 text-neutral-400"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      <p className="mb-3 text-sm text-neutral-700">{feedback.feedback}</p>
      <p className="text-xs text-neutral-500">
        {feedback.date} at {feedback.time}
      </p>
    </div>
  )
}

export default FeedbackHistoryPage
