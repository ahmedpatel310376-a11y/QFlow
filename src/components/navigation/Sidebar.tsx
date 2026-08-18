import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  Clock,
  Calendar,
  Bell,
  History,
  User,
  Settings,
  BarChart3,
  Zap,
  Users,
  CheckSquare,
  MapPin,
  Menu,
} from 'lucide-react'
import { useState } from 'react'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  items: SidebarItem[]
  title: string
}

export const Sidebar = ({ items, title }: SidebarProps) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed bottom-8 right-8 bg-primary-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 z-30 overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{title}</h2>
        </div>

        <nav className="px-4 space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export const userSidebarItems: SidebarItem[] = [
  {
    label: 'Overview',
    href: '/app',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Find Services',
    href: '/app/services',
    icon: <Search size={20} />,
  },
  {
    label: 'My Queues',
    href: '/app/queues',
    icon: <Clock size={20} />,
  },
  {
    label: 'Appointments',
    href: '/app/appointments',
    icon: <Calendar size={20} />,
  },
  {
    label: 'Notifications',
    href: '/app/notifications',
    icon: <Bell size={20} />,
  },
  {
    label: 'History',
    href: '/app/history',
    icon: <History size={20} />,
  },
  {
    label: 'Profile',
    href: '/app/profile',
    icon: <User size={20} />,
  },
  {
    label: 'Settings',
    href: '/app/settings',
    icon: <Settings size={20} />,
  },
]

export const adminSidebarItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard size={20} />,
  },
  {
    label: 'Live Queues',
    href: '/admin/queues',
    icon: <Clock size={20} />,
  },
  {
    label: 'Counters',
    href: '/admin/counters',
    icon: <CheckSquare size={20} />,
  },
  {
    label: 'Appointments',
    href: '/admin/appointments',
    icon: <Calendar size={20} />,
  },
  {
    label: 'Services',
    href: '/admin/services',
    icon: <MapPin size={20} />,
  },
  {
    label: 'Crowd Monitoring',
    href: '/admin/crowd',
    icon: <Users size={20} />,
  },
  {
    label: 'AI Insights',
    href: '/admin/ai',
    icon: <Zap size={20} />,
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: <BarChart3 size={20} />,
  },
  {
    label: 'Staff',
    href: '/admin/staff',
    icon: <Users size={20} />,
  },
  {
    label: 'Customers',
    href: '/admin/customers',
    icon: <User size={20} />,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: <Settings size={20} />,
  },
]
