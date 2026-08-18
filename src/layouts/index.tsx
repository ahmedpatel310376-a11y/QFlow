import { Outlet } from 'react-router-dom'
import { PublicNavbar } from '../components/navigation/Navbar'

export const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <Outlet />
    </div>
  )
}

export const UserLayout = () => {
  const userName = localStorage.getItem('userName') || 'User'
  const unreadNotifications = 0 // Will be fetched from API

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar will be in each page or created here */}
      <Outlet context={{ userName, unreadNotifications }} />
    </div>
  )
}

export const AdminLayout = () => {
  const userName = localStorage.getItem('userName') || 'Admin'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar will be in each page or created here */}
      <Outlet context={{ userName }} />
    </div>
  )
}
