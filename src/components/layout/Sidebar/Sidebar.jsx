/**
 * Sidebar Component
 */

import { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { useProfile } from '@/hooks'
import FeedbackModal from '@/components/features/FeedbackModal'

const Sidebar = ({ className = '', onLogout, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const profile = useProfile()
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  const navItems = [
    {
      name: 'Dashboard',
      icon: 'M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z',
      path: '/dashboard',
    },
    {
      name: 'Call Insights',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      path: '/calls',
    },
    {
      name: 'Knowledge Base',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      path: '/knowledge',
    },
    {
      name: 'Prompts',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      path: '/prompts',
    },
    {
      name: 'Busy Controls',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      path: '/busy-controls',
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

        {/* Logo */}
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="text-lg font-bold text-white">H</span>
            </div>
            <span className="text-xl font-bold text-neutral-900">Hintro</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path

              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.path)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    <span className="flex-1 text-left">{item.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Feedback Section */}
          <div className="mt-6 border-t border-neutral-200 pt-4">
            <button
              onClick={() => navigate('/feedback-history')}
              className="mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="flex-1 text-left">Feedback History</span>
            </button>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="mb-4 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="flex-1 text-left">Feedback</span>
            </button>

            {/* Upgrade Button */}
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-900">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              Upgrade
            </button>
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-neutral-200 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg p-2">
            <div className="bg-primary-100 text-primary-700 flex h-10 w-10 items-center justify-center rounded-full font-semibold">
              {profile.data?.firstName?.[0] || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-900">
                {profile.data?.firstName} {profile.data?.lastName}
              </p>
              <p className="truncate text-xs text-neutral-600">{profile.data?.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />
    </>
  )
}

Sidebar.propTypes = {
  className: PropTypes.string,
  onLogout: PropTypes.func,
  onClose: PropTypes.func,
}

export default Sidebar
