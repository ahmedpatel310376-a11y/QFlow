import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense, type ReactElement } from 'react'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from './components/common/Toast'

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Landing = lazy(() => import('./pages/public/Landing'))
const UserDashboard = lazy(() => import('./pages/user/Dashboard'))
const FindServices = lazy(() => import('./pages/user/FindServices'))
const OrganizationDetail = lazy(() => import('./pages/user/OrganizationDetail'))
const JoinQueue = lazy(() => import('./pages/user/JoinQueue'))
const LiveQueue = lazy(() => import('./pages/user/LiveQueue'))
const Appointments = lazy(() => import('./pages/user/Appointments'))
const BookAppointment = lazy(() => import('./pages/user/BookAppointment'))
const Notifications = lazy(() => import('./pages/user/Notifications'))
const History = lazy(() => import('./pages/user/History'))
const Profile = lazy(() => import('./pages/user/Profile'))
const Settings = lazy(() => import('./pages/user/Settings'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const LiveQueues = lazy(() => import('./pages/admin/LiveQueues'))
const Counters = lazy(() => import('./pages/admin/Counters'))
const AdminAppointments = lazy(() => import('./pages/admin/Appointments'))
const Services = lazy(() => import('./pages/admin/Services'))
const CrowdMonitoring = lazy(() => import('./pages/admin/CrowdMonitoring'))
const AIInsights = lazy(() => import('./pages/admin/AIInsights'))
const Analytics = lazy(() => import('./pages/admin/Analytics'))
const Staff = lazy(() => import('./pages/admin/Staff'))
const Customers = lazy(() => import('./pages/admin/Customers'))
const AdminSettings = lazy(() => import('./pages/admin/Settings'))

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
        <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#f6f7fb]"><div className="text-center"><div className="mx-auto h-11 w-11 animate-spin rounded-2xl border-4 border-indigo-100 border-t-indigo-600"/><p className="mt-4 text-sm font-bold text-slate-500">Loading your QFlow workspace…</p></div></div>}>
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
        </Suspense>
        <ToastContainer />
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
