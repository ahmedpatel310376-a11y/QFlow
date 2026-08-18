// User types
export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'user' | 'admin'
  createdAt: string
}

// Organization types
export interface Organization {
  id: string
  name: string
  type: 'hospital' | 'bank' | 'college' | 'office' | 'government'
  logo?: string
  address: string
  phone: string
  openingHours: string
  closingHours: string
  currentCrowdLevel: 'low' | 'moderate' | 'high'
  currentCrowdPercentage: number
}

// Service types
export interface Service {
  id: string
  organizationId: string
  name: string
  department?: string
  averageServiceTime: number // in minutes
  maxQueueLength: number
  currentQueueLength: number
  availableCounters: number
  status: 'open' | 'busy' | 'closed'
  estimatedWaitTime: number // in minutes
}

// Queue types
export interface Queue {
  id: string
  serviceId: string
  organizationId: string
  serviceName: string
  organizationName: string
  currentToken: string
  nextTokens: string[]
  waitingTokens: string[]
  status: 'active' | 'paused' | 'closed'
  totalWaiting: number
  averageWaitTime: number
}

// Token types
export interface Token {
  id: string
  queueId: string
  userId: string
  number: string
  status: 'waiting' | 'almost_your_turn' | 'serving' | 'completed' | 'skipped' | 'cancelled' | 'delayed'
  positionInQueue: number
  estimatedWaitTime: number // in minutes
  createdAt: string
  completedAt?: string
  counterId?: string
}

// Appointment types
export interface Appointment {
  id: string
  appointmentId: string
  userId: string
  organizationId: string
  serviceId: string
  organizationName: string
  serviceName: string
  department?: string
  date: string // YYYY-MM-DD
  time: string // HH:mm
  status: 'upcoming' | 'completed' | 'cancelled' | 'no_show'
  createdAt: string
}

// Notification types
export interface Notification {
  id: string
  userId: string
  type: 'queue' | 'appointment' | 'delay' | 'turn' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

// Analytics types
export interface QueueMetrics {
  totalServed: number
  totalCancelled: number
  averageWaitTime: number
  peakHours: string[]
  completionRate: number
}

// AI Insights types
export interface WaitTimePrediction {
  predictedWaitTime: number
  confidence: number
  factors: string[]
}

export interface CrowdPrediction {
  time: string
  level: 'low' | 'moderate' | 'high'
  percentage: number
}

export interface AIRecommendation {
  title: string
  description: string
  expectedImprovement: string
  priority: 'high' | 'medium' | 'low'
}

// Counter types
export interface Counter {
  id: string
  organizationId: string
  number: number
  status: 'active' | 'paused' | 'offline'
  currentlyServing?: string
  currentService: string
  staffName?: string
  totalServed: number
}

// History types
export interface QueueHistory {
  id: string
  organizationName: string
  serviceName: string
  date: string
  token: string
  waitingTime: number
  status: 'completed' | 'cancelled' | 'no_show'
}
