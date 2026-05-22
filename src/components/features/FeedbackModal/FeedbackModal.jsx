/**
 * FeedbackModal Component
 *
 * Figma-exact implementation:
 * - Width: 577px fixed
 * - Default state: 286px height — 5 outline stars, "How was your experience?" label
 * - Rating selected (1-3): 414px height — negative label + textarea
 * - Rating selected (4-5): 414px height — positive label + textarea
 * - Acknowledgement: 419px height — gold circle checkmark + thank you message
 *
 * Padding: 32px (p-8) on all sides, 10px gap between elements (Figma spec)
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'

// Extracted outside component to satisfy react-hooks/purity rule
// (Date.now and new Date are impure — cannot be called during render)
const createFeedbackEntry = (feedbackText, ratingValue) => ({
  id: Date.now(),
  feedback: feedbackText.trim(),
  rating: ratingValue,
  timestamp: new Date().toISOString(),
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString(),
})

const StarIcon = ({ filled, size = 40 }) => (
  <svg
    className={`transition-colors ${filled ? 'fill-yellow-400 text-yellow-400' : 'fill-none text-neutral-300'}`}
    style={{ width: size, height: size }}
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

StarIcon.propTypes = {
  filled: PropTypes.bool.isRequired,
  size: PropTypes.number,
}

const FeedbackModal = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  // --- Handlers ---

  const handleSubmit = (e) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    if (!feedback.trim()) {
      toast.error('Please enter your feedback')
      return
    }

    setSubmitting(true)

    const newFeedback = createFeedbackEntry(feedback, rating)

    const existingFeedback = JSON.parse(localStorage.getItem('hintro_feedback') || '[]')
    existingFeedback.unshift(newFeedback)
    localStorage.setItem('hintro_feedback', JSON.stringify(existingFeedback))

    setShowThankYou(true)
    setSubmitting(false)

    // Auto-close after 3 seconds
    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  const handleClose = () => {
    setShowThankYou(false)
    setFeedback('')
    setRating(0)
    setHoverRating(0)
    onClose()
  }

  const handleBack = () => {
    if (rating > 0) {
      // Reset to initial state (unselect all stars)
      setRating(0)
      setFeedback('')
    } else {
      handleClose()
    }
  }

  const handleStarClick = (star) => {
    setRating(star)
    setFeedback('')
  }

  // --- Derived state ---

  // Label above textarea changes based on star range (Figma spec)
  const feedbackLabel =
    rating > 0 && rating <= 3
      ? 'What frustrated you or felt confusing?'
      : 'Share details of your experience...'

  // Figma-exact height classes for each state
  const cardHeightClass = showThankYou ? 'h-[419px]' : rating > 0 ? 'h-[414px]' : 'h-[286px]'

  // Submit disabled: no rating, or rating selected but no feedback text
  const isSubmitDisabled = submitting || rating === 0 || (rating > 0 && !feedback.trim())

  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Card — Figma: 577px wide, padding 32px, radius 8px, gap 10px */}
      <div
        className={`relative w-full max-w-[577px] overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out ${cardHeightClass} flex flex-col`}
        style={{ padding: '32px' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        {/* --- X Close Button (top-right) --- */}
        <button
          onClick={handleClose}
          aria-label="Close feedback modal"
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
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

        {/* ============================
            ACKNOWLEDGEMENT STATE
            Figma: 419px — gold checkmark circle, heading, subtext, Close button
        ============================ */}
        {showThankYou ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
            {/* Gold circle with checkmark */}
            <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-yellow-100">
              <svg
                className="h-10 w-10 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <h3 id="feedback-modal-title" className="text-xl font-bold text-neutral-900">
                Thank you for your feedback!
              </h3>
              <p className="text-sm text-neutral-500">
                We appreciate you sharing your experience with us.
              </p>
            </div>

            {/* Close CTA Button */}
            <button
              onClick={handleClose}
              className="mt-2 w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
            >
              Close
            </button>
          </div>
        ) : (
          /* ============================
              FEEDBACK FORM STATE
              Default: 286px | Rating selected: 414px
          ============================ */
          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col justify-between"
            style={{ gap: '10px' }}
          >
            {/* Header */}
            <div>
              <h2 id="feedback-modal-title" className="text-xl font-bold text-neutral-900">
                Give Feedback
              </h2>
            </div>

            {/* Stars + Textarea body */}
            <div className="flex flex-1 flex-col justify-center space-y-5">
              {/* Star Rating Row */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-medium text-neutral-600">How was your experience?</p>

                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isHighlighted = star <= (hoverRating || rating)
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} out of 5 stars`}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <StarIcon filled={isHighlighted} size={40} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Conditional Textarea — only visible when a star rating is selected */}
              {rating > 0 && (
                <div className="space-y-2">
                  <label
                    htmlFor="feedbackText"
                    className="block text-sm font-semibold text-neutral-800"
                  >
                    {feedbackLabel}
                  </label>
                  <textarea
                    id="feedbackText"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Describe your experience here..."
                    rows={4}
                    className="w-full resize-none rounded-lg border border-neutral-300 px-4 py-3 text-sm text-neutral-800 placeholder-neutral-400 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none"
                    disabled={submitting}
                    required
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Footer Action Buttons */}
            <div className="flex gap-3 border-t border-neutral-100 pt-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="flex-1 rounded-lg border border-neutral-300 bg-white py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="flex-1 rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
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
