/**
 * Feedback Modal Component
 *
 * Allows users to submit feedback
 * Stores feedback in localStorage
 * Shows different messages based on rating (1-3 vs 4-5)
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'

const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isPositive, setIsPositive] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!feedback.trim()) {
      toast.error('Please enter your feedback')
      return
    }

    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    setSubmitting(true)

    // Create feedback object
    const newFeedback = {
      id: Date.now(),
      feedback: feedback.trim(),
      rating,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    }

    // Get existing feedback from localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')

    // Add new feedback
    existingFeedback.unshift(newFeedback)

    // Save to localStorage
    localStorage.setItem('hintro_feedback', JSON.stringify(existingFeedback))

    // Determine if positive or negative feedback
    const positive = rating >= 4
    setIsPositive(positive)

    // Show thank you message
    setShowThankYou(true)
    setSubmitting(false)

    // Close modal after 2 seconds
    setTimeout(() => {
      setShowThankYou(false)
      setFeedback('')
      setRating(0)
      onClose()
    }, 2000)
  }

  const handleClose = () => {
    setShowThankYou(false)
    setFeedback('')
    setRating(0)
    onClose()
  }

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        {showThankYou ? (
          // Thank You Message
          <div className="py-8 text-center">
            {isPositive ? (
              // Positive feedback (4-5 stars)
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                  <svg className="h-10 w-10 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  Thank you for your feedback!!
                </h3>
              </>
            ) : (
              // Negative feedback (1-3 stars)
              <>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <svg
                    className="h-10 w-10 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900">
                  We appreciate your feedback!
                </h3>
              </>
            )}
          </div>
        ) : (
          // Feedback Form
          <>
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900">Give Feedback</h2>
              <button
                onClick={handleClose}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating */}
              <div>
                <label className="mb-3 block text-center text-sm text-neutral-600">
                  How was your experience?
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <svg
                        className={`h-10 w-10 ${
                          star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'
                        }`}
                        fill={star <= rating ? 'currentColor' : 'none'}
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
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={
                    rating >= 1 && rating <= 3
                      ? 'What frustrated you or felt confusing?'
                      : 'Share details of your experience...'
                  }
                  rows={4}
                  className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
                  disabled={submitting}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  disabled={submitting}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default FeedbackModal
