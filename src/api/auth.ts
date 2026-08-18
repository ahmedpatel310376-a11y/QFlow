import { User } from '../types'
import { mockCurrentUser, mockAdminUser } from '../data/mockData'

// Simulated auth service - will be replaced with real API calls
let currentUser: User | null = null

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    // Mock validation
    if (email === 'ahmed@example.com' && password === 'password') {
      const user = mockCurrentUser
      const token = 'mock-token-user-001'
      currentUser = user
      localStorage.setItem('authToken', token)
      localStorage.setItem('userRole', 'user')
      return { user, token }
    }
    if (email === 'sarah@qflow.com' && password === 'password') {
      const user = mockAdminUser
      const token = 'mock-token-admin-001'
      currentUser = user
      localStorage.setItem('authToken', token)
      localStorage.setItem('userRole', 'admin')
      return { user, token }
    }
    throw new Error('Invalid credentials')
  },

  register: async (data: {
    name: string
    email: string
    phone: string
    password: string
    role: 'user' | 'admin'
  }): Promise<{ user: User; token: string }> => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createdAt: new Date().toISOString().split('T')[0],
    }
    const token = `mock-token-${newUser.id}`
    currentUser = newUser
    localStorage.setItem('authToken', token)
    localStorage.setItem('userRole', data.role)
    return { user: newUser, token }
  },

  logout: (): void => {
    currentUser = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
  },

  getCurrentUser: (): User | null => {
    if (!currentUser) {
      const token = localStorage.getItem('authToken')
      if (token) {
        // In a real app, validate token and fetch user
        const role = localStorage.getItem('userRole')
        currentUser = role === 'admin' ? mockAdminUser : mockCurrentUser
      }
    }
    return currentUser
  },

  isAuthenticated: (): boolean => {
    return Boolean(localStorage.getItem('authToken'))
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem('authToken')
  },
}
