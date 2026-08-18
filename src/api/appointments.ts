import { Appointment } from '../types'
import { mockAppointments } from '../data/mockData'

let appointments = [...mockAppointments]

export const appointmentService = {
  getAppointments: async (userId: string): Promise<Appointment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return appointments.filter((apt) => apt.userId === userId)
  },

  getAppointmentById: async (appointmentId: string): Promise<Appointment | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return appointments.find((apt) => apt.id === appointmentId) || null
  },

  getUpcomingAppointments: async (userId: string): Promise<Appointment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return appointments.filter(
      (apt) => apt.userId === userId && apt.status === 'upcoming'
    )
  },

  bookAppointment: async (data: {
    userId: string
    organizationId: string
    serviceId: string
    date: string
    time: string
    organizationName: string
    serviceName: string
    department?: string
  }): Promise<Appointment> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      appointmentId: `QF-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: data.userId,
      organizationId: data.organizationId,
      serviceId: data.serviceId,
      organizationName: data.organizationName,
      serviceName: data.serviceName,
      department: data.department,
      date: data.date,
      time: data.time,
      status: 'upcoming',
      createdAt: new Date().toISOString().split('T')[0],
    }

    appointments.push(newAppointment)
    return newAppointment
  },

  cancelAppointment: async (appointmentId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const apt = appointments.find((a) => a.id === appointmentId)
    if (apt) {
      apt.status = 'cancelled'
    }
  },

  rescheduleAppointment: async (
    appointmentId: string,
    newDate: string,
    newTime: string
  ): Promise<Appointment | null> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const apt = appointments.find((a) => a.id === appointmentId)
    if (apt) {
      apt.date = newDate
      apt.time = newTime
    }
    return apt || null
  },

  getAvailableSlots: async (): Promise<string[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    // Return mock available slots
    const slots = []
    for (let i = 9; i < 17; i++) {
      for (let j = 0; j < 60; j += 30) {
        const time = `${String(i).padStart(2, '0')}:${String(j).padStart(2, '0')}`
        if (Math.random() > 0.3) {
          slots.push(time)
        }
      }
    }
    return slots
  },

  // Admin functions
  getAllAppointments: async (organizationId?: string): Promise<Appointment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    if (organizationId) {
      return appointments.filter((apt) => apt.organizationId === organizationId)
    }
    return appointments
  },
}
