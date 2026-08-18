import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from './components/common/Toast'

// Auth pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Public pages
import Landing from './pages/public/Landing'

// User pages
import UserDashboard from './pages/user/Dashboard'
import FindServices from './pages/user/FindServices'
import OrganizationDetail from './pages/user/OrganizationDetail'
import JoinQueue from './pages/user/JoinQueue'
import LiveQueue from './pages/user/LiveQueue'
import Appointments from './pages/user/Appointments'
import BookAppointment from './pages/user/BookAppointment'
import Notifications from './pages/user/Notifications'
import History from './pages/user/History'
import Profile from './pages/user/Profile'
import Settings from './pages/user/Settings'

// Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import LiveQueues from './pages/admin/LiveQueues'
import Counters from './pages/admin/Counters'
import AdminAppointments from './pages/admin/Appointments'
import Services from './pages/admin/Services'
import CrowdMonitoring from './pages/admin/CrowdMonitoring'
import AIInsights from './pages/admin/AIInsights'
import Analytics from './pages/admin/Analytics'
import Staff from './pages/admin/Staff'
import Customers from './pages/admin/Customers'
import AdminSettings from './pages/admin/Settings'

// Layouts
import { PublicLayout, UserLayout, AdminLayout } from './layouts'

// Protected routes
const ProtectedRoute = ({ element, role }: { element: ReactElement; role: 'user' | 'admin' }) => {
  const token = localStorage.getItem('authToken')
  const userRole = localStorage.getItem('userRole')

  if (!token) {
    return <Navigate to="/login" />
  }

  if (userRole !== role) {
    return <Navigate to={role === 'admin' ? '/admin' : '/app'} />
  }

  return element
}

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* User routes */}
          <Route element={<UserLayout />}>
            <Route path="/app" element={<ProtectedRoute element={<UserDashboard />} role="user" />} />
            <Route path="/app/services" element={<ProtectedRoute element={<FindServices />} role="user" />} />
            <Route path="/app/organization/:id" element={<ProtectedRoute element={<OrganizationDetail />} role="user" />} />
            <Route path="/app/queue/:id" element={<ProtectedRoute element={<LiveQueue />} role="user" />} />
            <Route path="/app/join-queue/:queueId" element={<ProtectedRoute element={<JoinQueue />} role="user" />} />
            <Route path="/app/appointments" element={<ProtectedRoute element={<Appointments />} role="user" />} />
            <Route path="/app/book-appointment/:serviceId" element={<ProtectedRoute element={<BookAppointment />} role="user" />} />
            <Route path="/app/queues" element={<ProtectedRoute element={<FindServices />} role="user" />} />
            <Route path="/app/notifications" element={<ProtectedRoute element={<Notifications />} role="user" />} />
            <Route path="/app/history" element={<ProtectedRoute element={<History />} role="user" />} />
            <Route path="/app/profile" element={<ProtectedRoute element={<Profile />} role="user" />} />
            <Route path="/app/settings" element={<ProtectedRoute element={<Settings />} role="user" />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} role="admin" />} />
            <Route path="/admin/queues" element={<ProtectedRoute element={<LiveQueues />} role="admin" />} />
            <Route path="/admin/counters" element={<ProtectedRoute element={<Counters />} role="admin" />} />
            <Route path="/admin/appointments" element={<ProtectedRoute element={<AdminAppointments />} role="admin" />} />
            <Route path="/admin/services" element={<ProtectedRoute element={<Services />} role="admin" />} />
            <Route path="/admin/crowd" element={<ProtectedRoute element={<CrowdMonitoring />} role="admin" />} />
            <Route path="/admin/ai" element={<ProtectedRoute element={<AIInsights />} role="admin" />} />
            <Route path="/admin/analytics" element={<ProtectedRoute element={<Analytics />} role="admin" />} />
            <Route path="/admin/staff" element={<ProtectedRoute element={<Staff />} role="admin" />} />
            <Route path="/admin/customers" element={<ProtectedRoute element={<Customers />} role="admin" />} />
            <Route path="/admin/settings" element={<ProtectedRoute element={<AdminSettings />} role="admin" />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
