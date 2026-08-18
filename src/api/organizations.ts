import { Organization } from '../types'
import { mockOrganizations } from '../data/mockData'

let organizations = [...mockOrganizations]

export const organizationService = {
  getOrganizations: async (): Promise<Organization[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return organizations
  },

  getOrganizationById: async (organizationId: string): Promise<Organization | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return organizations.find((org) => org.id === organizationId) || null
  },

  searchOrganizations: async (
    query: string,
    filters?: {
      type?: string
      location?: string
    }
  ): Promise<Organization[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    let results = organizations

    if (query) {
      results = results.filter(
        (org) =>
          org.name.toLowerCase().includes(query.toLowerCase()) ||
          org.address.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (filters?.type) {
      results = results.filter((org) => org.type === filters.type)
    }

    return results
  },

  updateOrganization: async (
    organizationId: string,
    updates: Partial<Organization>
  ): Promise<Organization | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const org = organizations.find((o) => o.id === organizationId)
    if (org) {
      Object.assign(org, updates)
    }
    return org || null
  },

  updateCrowdLevel: async (
    organizationId: string,
    level: 'low' | 'moderate' | 'high',
    percentage: number
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    const org = organizations.find((o) => o.id === organizationId)
    if (org) {
      org.currentCrowdLevel = level
      org.currentCrowdPercentage = percentage
    }
  },
}
