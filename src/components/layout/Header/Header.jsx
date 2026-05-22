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
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          Watch Tutorial
        </button>

        {/* User Avatar */}
        <button className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50">
          <img
            src="https://ui-avatars.com/api/?name=User&background=random"
            alt="User avatar"
            className="h-6 w-6 rounded-full object-cover"
          />
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
