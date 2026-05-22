import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@/context/UserContext'
import { useCallStats, useCallHistory, useProfile } from '@/hooks'
import Sidebar from '@/components/layout/Sidebar'

const DashboardPage = () => {
  const navigate = useNavigate()
  const { userId, setUserId, isEmptyState } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showAvatarMenu, setShowAvatarMenu] = useState(false)

  const profile = useProfile()
  const stats = useCallStats()
  const history = useCallHistory({ limit: 10 })

  const confirmLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/login')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">

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

        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-6">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-base font-semibold text-neutral-900">Dashboard</h1>
          </div>


          <div className="flex items-center gap-3">

            <button className="hidden items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50 sm:flex">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Tutorial
            </button>


            <div className="relative">
              <button
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 hover:bg-neutral-50"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
                  {profile.data?.firstName?.[0] || 'U'}
                </div>
                <svg
                  className={`h-3.5 w-3.5 text-neutral-500 transition-transform duration-200 ${
                    showAvatarMenu ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showAvatarMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowAvatarMenu(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-40 rounded-lg border border-neutral-200 bg-white py-1.5 shadow-lg">
                    <button
                      onClick={() => {
                        setShowAvatarMenu(false)
                        setShowLogoutModal(true)
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                    >
                      <svg
                        className="h-4 w-4 text-neutral-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>


        <main className="flex-1 overflow-y-auto bg-white">

          <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-5">
            <div>
              <p className="text-base font-semibold text-neutral-900">
                Hi, {profile.data?.firstName || 'Name'} 👋 Welcome to Hintro
              </p>
              <p className="mt-0.5 text-xs text-neutral-500">
                Ready to make your next call smarter ?
              </p>
            </div>
            <button className="rounded-lg bg-neutral-900 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-black">
              Start New Call
            </button>
          </div>


          <div className="p-6">

            <div className="mb-5 flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <p className="flex-1 text-xs font-medium text-amber-800">
                Switch users to test empty / filled states:
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setUserId('u1')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    userId === 'u1'
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  u1 — Empty
                </button>
                <button
                  onClick={() => setUserId('u2')}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    userId === 'u2'
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  u2 — Filled
                </button>
              </div>
            </div>

            {isEmptyState ? <EmptyState /> : <FilledState stats={stats} history={history} />}
          </div>
        </main>
      </div>


      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} onConfirm={confirmLogout} />
      )}
    </div>
  )
}


const EmptyState = () => (
  <div className="space-y-6">

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard title="Total Sessions" value="0" color="red" />
      <StatCard title="Average Duration" value="0" color="blue" />
      <StatCard title="AI Used" value="0" color="green" />
      <StatCard title="Last Session" value="-" color="purple" />
    </div>


    <div>
      <h2 className="mb-4 text-center text-sm font-semibold text-neutral-900">Recent calls</h2>
      <div className="rounded-xl border border-neutral-200 bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
            <svg
              className="h-7 w-7 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="mb-1 text-sm font-semibold text-neutral-900">No Recent Calls</h3>
          <p className="mb-5 max-w-sm text-xs text-neutral-500">
            Connect your Google Calendar to see upcoming meetings, get reminders, and join calls
            directly from Hintro.
          </p>
          <button className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
            Start a Call
          </button>
        </div>
      </div>
    </div>
  </div>
)


const formatDuration = (seconds) => {
  if (!seconds) {
    return '0sec'
  }
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}m ${s}sec` : `${s}sec`
}

const formatRelativeDate = (dateString) => {
  if (!dateString) {
    return '-'
  }
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return '-'
  }
  const diffDays = Math.floor((Date.now() - date.getTime()) / 86400000)
  if (diffDays === 0) {
    return 'Today'
  }
  if (diffDays === 1) {
    return 'Yesterday'
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}


const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) {
    return 'th'
  }
  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}


const FilledState = ({ stats, history }) => {

  const groupedCalls = (() => {
    const sessions = history.data?.callSessions || []
    const groups = {}
    sessions.forEach((call) => {
      if (!call.started_at) {
        return
      }
      const date = new Date(call.started_at)
      if (isNaN(date.getTime())) {
        return
      }
      const day = date.getDate()
      const month = date.toLocaleDateString('en-US', { month: 'long' })
      const label = `${month} ${day}${getOrdinalSuffix(day)}`
      if (!groups[label]) {
        groups[label] = []
      }
      groups[label].push(call)
    })
    return Object.entries(groups)
  })()

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Sessions"
          value={stats.loading ? '…' : String(stats.data?.totalSessions ?? 0)}
          color="red"
        />
        <StatCard
          title="Average Duration"
          value={stats.loading ? '…' : formatDuration(stats.data?.averageDuration)}
          color="blue"
        />
        <StatCard
          title="AI Used"
          value={stats.loading ? '…' : `${stats.data?.totalAIInteractions ?? 0} times`}
          color="green"
        />
        <StatCard
          title="Last Session"
          value={
            stats.loading
              ? '…'
              : stats.data?.lastSession?.[0]
                ? formatRelativeDate(stats.data.lastSession[0])
                : '-'
          }
          color="purple"
        />
      </div>


      <div className="rounded-xl border border-neutral-200 bg-white">
        <div className="border-b border-neutral-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-neutral-900">Recent calls</h2>
        </div>

        {history.loading ? (
          <div className="space-y-px p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-neutral-100" />
            ))}
          </div>
        ) : groupedCalls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-sm text-neutral-500">No calls found.</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {groupedCalls.map(([dateLabel, calls]) => (
              <div key={dateLabel}>

                <div className="bg-neutral-50 px-5 py-2">
                  <p className="text-xs font-medium text-neutral-500">{dateLabel}</p>
                </div>

                {calls.map((call) => (
                  <CallItem key={call._id || call.id} call={call} formatDuration={formatDuration} />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


const STAT_COLORS = {
  red: {
    bg: 'bg-red-100',
    iconClass: 'text-red-500',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
        />
      </>
    ),
  },
  blue: {
    bg: 'bg-blue-100',
    iconClass: 'text-blue-500',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  green: {
    bg: 'bg-emerald-100',
    iconClass: 'text-emerald-500',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    ),
  },
  purple: {
    bg: 'bg-purple-100',
    iconClass: 'text-purple-500',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
}

const StatCard = ({ title, value, color }) => {
  const c = STAT_COLORS[color]
  return (
    <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-5">
      {/* Squircle icon */}
      <div
        className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${c.bg}`}
      >
        <svg
          className={`h-5 w-5 ${c.iconClass}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {c.icon}
        </svg>
      </div>
      {/* Text */}
      <div className="min-w-0">
        <p className="text-xs text-neutral-500">{title}</p>
        <p className="mt-0.5 text-xl font-bold text-neutral-900">{value}</p>
      </div>
    </div>
  )
}


const CallItem = ({ call, formatDuration }) => {
  const formatTime = (dateString) => {
    if (!dateString) {
      return ''
    }
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return ''
    }
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return (
    <div className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-neutral-50">
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500">
          <span className="text-sm font-semibold text-white">
            {(call.client || call.description || 'C')[0].toUpperCase()}
          </span>
        </div>


        <div>
          <p className="text-sm font-medium text-neutral-900">
            {call.description || call.client || 'Call Session'}
          </p>
          <div className="mt-0.5 flex items-center gap-2">

            <span className="text-xs text-yellow-400">★★★</span>
            {call.total_duration_seconds > 0 && (
              <>
                <span className="text-xs text-neutral-300">·</span>
                <span className="text-xs text-neutral-500">
                  {formatDuration(call.total_duration_seconds)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>


      <div className="flex items-center gap-3">
        <span className="text-xs text-neutral-500">{formatTime(call.started_at)}</span>
        <button className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>
    </div>
  )
}


const LogoutModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-[1400] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40" onClick={onCancel} aria-hidden="true" />
    <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
      <h2 className="mb-1.5 text-base font-semibold text-neutral-900">Leaving already?</h2>
      <p className="mb-6 text-sm text-neutral-500">
        You can log back in anytime to continue your meetings with Hintro.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-lg border border-neutral-300 bg-white py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-black"
        >
          Log out
        </button>
      </div>
    </div>
  </div>
)

export default DashboardPage
