/**
 * Header Component
 */

import PropTypes from 'prop-types'

const Header = ({ onMenuClick, profile, className = '' }) => {
  return (
    <header
      className={`sticky top-0 z-50 flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:px-6 ${className}`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Watch Tutorial Button */}
        <button className="hidden items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 sm:flex">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Watch Tutorial
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50">
          <div className="bg-primary-100 text-primary-700 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold">
            {profile?.data?.firstName?.[0] || 'U'}
          </div>
          <svg
            className="h-4 w-4 text-neutral-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </header>
  )
}

Header.propTypes = {
  onMenuClick: PropTypes.func,
  profile: PropTypes.object,
  className: PropTypes.string,
}

export default Header
