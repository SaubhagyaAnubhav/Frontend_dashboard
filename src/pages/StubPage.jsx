

import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Sidebar from '@/components/layout/Sidebar'
import { useState } from 'react'

const StubPage = ({ title, icon }) => {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
            <h1 className="text-base font-semibold text-neutral-900">{title}</h1>
          </div>
        </header>

        
        <main className="flex flex-1 flex-col items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <svg
                className="h-8 w-8 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-neutral-900">{title}</h2>
              <p className="mt-1 text-sm text-neutral-500">This section is coming soon.</p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}

StubPage.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export const CallInsightsPage = () => (
  <StubPage
    title="Call Insights"
    icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  />
)

export const KnowledgeBasePage = () => (
  <StubPage
    title="Knowledge Base"
    icon="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
  />
)

export const PromptsPage = () => (
  <StubPage
    title="Prompts"
    icon="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  />
)

export const BusyControlsPage = () => (
  <StubPage title="Busy Controls" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
)

export default StubPage
