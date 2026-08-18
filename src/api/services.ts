import { Service } from '../types'
import { mockServices } from '../data/mockData'

let services = [...mockServices]

export const serviceService = {
  getServices: async (): Promise<Service[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return services
  },

  getServiceById: async (serviceId: string): Promise<Service | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return services.find((svc) => svc.id === serviceId) || null
  },

  getServicesByOrganization: async (organizationId: string): Promise<Service[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return services.filter((svc) => svc.organizationId === organizationId)
  },

  searchServices: async (query: string): Promise<Service[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return services.filter((svc) =>
      svc.name.toLowerCase().includes(query.toLowerCase())
    )
  },

  updateService: async (
    serviceId: string,
    updates: Partial<Service>
  ): Promise<Service | null> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const service = services.find((s) => s.id === serviceId)
    if (service) {
      Object.assign(service, updates)
    }
    return service || null
  },

  createService: async (
    organizationId: string,
    data: Omit<Service, 'id' | 'organizationId'>
  ): Promise<Service> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const newService: Service = {
      ...data,
      id: `svc-${Date.now()}`,
      organizationId,
    }
    services.push(newService)
    return newService
  },

  deleteService: async (serviceId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    services = services.filter((s) => s.id !== serviceId)
  },
}
