import {
  mockQueueVolumeData,
  mockAverageWaitTimeData,
  mockVisitorsPerDayData,
  mockServicePerformanceData,
  mockCompletionData,
} from '../data/mockData'

export interface AnalyticsDataPoint {
  [key: string]: string | number
}

export const analyticsService = {
  getQueueVolumeData: async (
    period: 'today' | '7days' | '30days' | '3months' = 'today'
  ): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Return mock data with slight randomization based on period
    const multiplier = {
      today: 1,
      '7days': 1.2,
      '30days': 1.5,
      '3months': 2,
    }[period] || 1

    return mockQueueVolumeData.map((item) => ({
      ...item,
      volume: Math.round(item.volume * multiplier),
    }))
  },

  getAverageWaitTimeData: async (): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return mockAverageWaitTimeData.map((item) => ({
      ...item,
      wait: item.wait + Math.floor(Math.random() * 5 - 2),
    }))
  },

  getVisitorsPerDayData: async (): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockVisitorsPerDayData
  },

  getServicePerformanceData: async (): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockServicePerformanceData.map((item) => ({
      ...item,
      avgTime: Math.max(1, item.avgTime + Math.floor(Math.random() * 4 - 2)),
    }))
  },

  getCompletionRateData: async (): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return mockCompletionData
  },

  getCounterUtilizationData: async (): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      { counter: 'Counter 1', utilization: 92 },
      { counter: 'Counter 2', utilization: 88 },
      { counter: 'Counter 3', utilization: 85 },
      { counter: 'Counter 4', utilization: 45 },
      { counter: 'Counter 5', utilization: 0 },
    ]
  },

  getPeakHoursData: async (): Promise<AnalyticsDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      { time: '10:00 AM', visitors: 67 },
      { time: '11:00 AM', visitors: 89 },
      { time: '12:00 PM', visitors: 72 },
      { time: '2:00 PM', visitors: 78 },
      { time: '3:00 PM', visitors: 65 },
      { time: '4:00 PM', visitors: 54 },
    ]
  },

  getDashboardMetrics: async (): Promise<{
    peopleWaiting: number
    activeQueues: number
    activeCounters: number
    averageWait: number
    servedToday: number
    cancelledToday: number
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    return {
      peopleWaiting: 127,
      activeQueues: 8,
      activeCounters: 12,
      averageWait: 18,
      servedToday: 483,
      cancelledToday: 21,
    }
  },
}
