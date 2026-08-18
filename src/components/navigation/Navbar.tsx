import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, Bell } from 'lucide-react'
import { authService } from '../../api/auth'
import { useToast } from '../../context/ToastContext'

const QFlowLogo = () => (
  <div className="flex items-center gap-2 text-xl font-bold text-primary-600">
    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
      ⟿
    </div>
    QFlow
  </div>
)

export const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Product', href: '/#features' },
    { label: 'How it works', href: '/#howitworks' },
    { label: 'For Organizations', href: '/#organizations' },
    { label: 'About', href: '/#about' },
  ]

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-max flex items-center justify-between h-16">
        <Link to="/" className="flex-shrink-0">
          <QFlowLogo />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container-max py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

interface UserNavbarProps {
  userName: string
  unreadNotifications: number
}

export const UserNavbar = ({ userName, unreadNotifications }: UserNavbarProps) => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    addToast('Logged out successfully', 'success')
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-max flex items-center justify-between h-16">
        <Link to="/app" className="flex-shrink-0">
          <QFlowLogo />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/app/notifications"
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                {userName.charAt(0)}
              </div>
              <span className="hidden md:inline text-sm font-medium">{userName}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <Link
                  to="/app/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/app/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

interface AdminNavbarProps {
  userName: string
}

export const AdminNavbar = ({ userName }: AdminNavbarProps) => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    addToast('Logged out successfully', 'success')
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="container-max flex items-center justify-between h-16">
        <Link to="/admin" className="flex-shrink-0">
          <QFlowLogo />
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                {userName.charAt(0)}
              </div>
              <span className="hidden md:inline text-sm font-medium">{userName}</span>
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                <Link
                  to="/admin/settings"
                  className="block px-4 py-2 text-sm hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Organization Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
