import { Notification } from '../types'
import { mockNotifications } from '../data/mockData'

let notifications = [...mockNotifications]

export const notificationService = {
  getNotifications: async (userId: string): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return notifications.filter((n) => n.userId === userId).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  },

  getUnreadNotifications: async (userId: string): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return notifications.filter((n) => n.userId === userId && !n.read)
  },

  getUnreadCount: async (userId: string): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return notifications.filter((n) => n.userId === userId && !n.read).length
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const notif = notifications.find((n) => n.id === notificationId)
    if (notif) {
      notif.read = true
    }
  },

  markAllAsRead: async (userId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    notifications.forEach((n) => {
      if (n.userId === userId) {
        n.read = true
      }
    })
  },

  deleteNotification: async (notificationId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    notifications = notifications.filter((n) => n.id !== notificationId)
  },

  createNotification: async (
    userId: string,
    data: Omit<Notification, 'id' | 'userId' | 'createdAt'>
  ): Promise<Notification> => {
    const newNotification: Notification = {
      ...data,
      id: `notif-${Date.now()}`,
      userId,
      createdAt: new Date().toISOString(),
    }
    notifications.push(newNotification)
    return newNotification
  },
}
