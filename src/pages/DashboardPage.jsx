/**
 * Dashboard Page
 *
 * Main dashboard matching Figma design
 * Shows empty state for u1, filled state for u2
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import { useCallStats, useCallHistory, useProfile } from '@/hooks'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { userId, setUserId, isEmptyState } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const profile = useProfile()
  const stats = useCallStats()
  const history = useCallHistory({ limit: 10 })

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar - Desktop */}
      <Sidebar className="hidden lg:flex" onLogout={handleLogout} />

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar onLogout={handleLogout} onClose={() => setMobileMenuOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={() => setMobileMenuOpen(true)} profile={profile} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {/* Welcome Section */}
          <div className="border-b border-neutral-200 bg-white px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-neutral-900">
                  Hi, {profile.data?.firstName || 'User'} 👋 Welcome to Hintro
                </h1>
                <p className="mt-1 text-sm text-neutral-600">
                  Ready to make your next call smarter ?
                </p>
              </div>
              <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
                Start New Call
              </button>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6">
            {/* User Switcher - For Testing (Remove in production) */}
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-900">Testing Mode</p>
                <p className="text-xs text-amber-700">
                  Switch between users to test empty/filled states
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setUserId('u1')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    userId === 'u1'
                      ? 'bg-primary-500 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  User 1 (Empty)
                </button>
                <button
                  onClick={() => setUserId('u2')}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    userId === 'u2'
                      ? 'bg-primary-500 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  User 2 (Filled)
                </button>
              </div>
            </div>

            {isEmptyState ? (
              <DashboardEmptyState />
            ) : (
              <DashboardFilledState stats={stats} history={history} />
            )}
          </div>
        </main>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} onConfirm={confirmLogout} />
      )}
    </div>
  )
}

// Empty State Component (u1) - Matches Figma
const DashboardEmptyState = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards - All showing 0 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Sessions" value="0" icon="phone" color="red" />
        <StatCard title="Average Duration" value="0" icon="clock" color="blue" />
        <StatCard title="AI Used" value="0 times" icon="sparkles" color="green" />
        <StatCard title="Last Session" value="-" icon="calendar" color="purple" />
      </div>

      {/* Recent Calls - Empty State */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="mb-6 text-lg font-semibold text-neutral-900">Recent calls</h2>

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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-base font-semibold text-neutral-900">No Recent Calls</h3>
          <p className="mb-6 max-w-sm text-center text-sm text-neutral-600">
            Your recent calls will appear here once you start making calls
          </p>
          <button className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            Start a Call
          </button>
        </div>
      </div>
    </div>
  )
}

// Filled State Component (u2) - Matches Figma
const DashboardFilledState = ({ stats, history }) => {
  // Format duration from seconds to "Xm Ysec" format
  const formatDuration = (seconds) => {
    if (!seconds) {
      return '0sec'
    }
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    if (minutes > 0) {
      return `${minutes}m ${secs}sec`
    }
    return `${secs}sec`
  }

  // Format date to relative time
  const formatDate = (dateString) => {
    if (!dateString) {
      return '-'
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return '-'
    }
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return 'Today'
    }
    if (diffDays === 1) {
      return 'Yesterday'
    }
    if (diffDays < 7) {
      return `${diffDays} days ago`
    }
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Sessions"
          value={stats.data?.totalSessions || 0}
          icon="phone"
          color="red"
        />
        <StatCard
          title="Average Duration"
          value={formatDuration(stats.data?.averageDuration || 0)}
          icon="clock"
          color="blue"
        />
        <StatCard
          title="AI Used"
          value={`${stats.data?.totalAIInteractions || 0} times`}
          icon="sparkles"
          color="green"
        />
        <StatCard
          title="Last Session"
          value={stats.data?.lastSession?.[0] ? formatDate(stats.data.lastSession[0]) : '-'}
          icon="calendar"
          color="purple"
        />
      </div>

      {/* Recent Calls */}
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <h2 className="mb-6 text-lg font-semibold text-neutral-900">Recent calls</h2>

        {history.loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-neutral-100" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {history.data?.callSessions?.map((call) => (
              <CallItem key={call._id || call.id} call={call} formatDuration={formatDuration} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} // Stat Card Component - Matches Figma design
const StatCard = ({ title, value, color }) => {
  const colorClasses = {
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
  }

  const colors = colorClasses[color]

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-600">{title}</p>
          <p className="mt-2 text-2xl font-bold text-neutral-900">{value}</p>
        </div>
        <div className={`rounded-lg p-3 ${colors.bg}`}>
          <svg
            className={`h-6 w-6 ${colors.text}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={colors.icon} />
          </svg>
        </div>
      </div>
    </div>
  )
}

// Call Item Component - Matches Figma design
const CallItem = ({ call, formatDuration }) => {
  const formatTime = (dateString) => {
    if (!dateString) {
      return '-'
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return '-'
    }
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 p-4 transition-colors hover:bg-neutral-50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-900">
            {call.client || call.description || 'Client'}
          </p>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="text-xs text-neutral-600">⭐⭐⭐</span>
            {call.total_duration_seconds && (
              <>
                <span className="text-xs text-neutral-300">•</span>
                <span className="text-xs text-neutral-500">
                  {formatDuration(call.total_duration_seconds)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-neutral-600">{formatTime(call.started_at)}</span>
        <button className="text-neutral-400 hover:text-neutral-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Logout Modal Component - Matches Figma
const LogoutModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-2 text-xl font-semibold text-neutral-900">Leaving already?</h2>
        <p className="mb-6 text-sm text-neutral-600">
          We can not wait 15 minutes to continue your meetings with Hintro
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
