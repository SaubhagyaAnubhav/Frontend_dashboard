/**
 * Sidebar Component
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import FeedbackModal from '@/components/features/FeedbackModal'

const Sidebar = ({ className = '', onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const navItems = [
    {
      name: 'Dashboard',
      icon: (
        <>
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </>
      ),
      path: '/dashboard',
    },
    {
      name: 'Call Insights',
      icon: (
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      ),
      path: '/calls',
    },
    {
      name: 'Knowledge Base',
      icon: (
        <>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </>
      ),
      path: '/knowledge',
      hasInfo: true,
    },
    {
      name: 'Prompts',
      icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
      path: '/prompts',
      hasInfo: true,
    },
    {
      name: 'Boxy Controls',
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </>
      ),
      path: '/busy-controls',
      hasInfo: true,
    },
  ]

  const handleNavClick = (path) => {
    navigate(path)
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      <aside
        className={`flex h-screen w-[280px] flex-col border-r border-neutral-200 bg-white ${className}`}
      >
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
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
        )}

        {/* Logo (Figma match - just premium text Hintro, no border-b, no square badge) */}
        <div className="mt-2 flex h-20 items-center px-8">
          <span className="font-display text-[28px] font-bold tracking-wide text-neutral-900">
            Hintro
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-5 py-2">
          <ul className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#eef2ff] text-[#4f46e5]'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <svg
                      className="h-5 w-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                    </svg>
                    <span className="text-left">{item.name}</span>
                    {item.hasInfo && (
                      <svg
                        className="ml-auto h-4 w-4 text-neutral-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Anchored downside section matching Figma empty state */}
        <div className="space-y-1 border-t border-neutral-200 p-5">
          {/* Feedback History Button */}
          <button
            onClick={() => {
              navigate('/feedback-history')
              if (onClose) {
                onClose()
              }
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            {/* Inbox SVG */}
            <svg
              className="h-5 w-5 flex-shrink-0 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
            </svg>
            <span className="flex-1 text-left">Feedback History</span>
          </button>

          {/* Feedback Button */}
          <button
            onClick={() => {
              setShowFeedbackModal(true)
              if (onClose) {
                onClose()
              }
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            {/* Gift Box SVG */}
            <svg
              className="h-5 w-5 flex-shrink-0 text-neutral-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" />
            </svg>
            <span className="flex-1 text-left">Feedback</span>
          </button>

          {/* Upgrade Pill Button */}
          <div className="pt-3">
            <button className="flex w-full items-center justify-center rounded-lg bg-[#828282] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-neutral-600">
              Upgrade
            </button>
          </div>
        </div>
      </aside>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
    </>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
}

export default Sidebar
