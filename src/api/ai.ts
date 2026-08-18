import {
  WaitTimePrediction,
  CrowdPrediction,
  AIRecommendation,
} from '../types'
import {
  mockWaitTimePrediction,
  mockCrowdPredictions,
  mockAIRecommendations,
} from '../data/mockData'

export const aiService = {
  getWaitTimePrediction: async (): Promise<WaitTimePrediction> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    // Return slightly randomized mock predictions
    return {
      ...mockWaitTimePrediction,
      predictedWaitTime: Math.max(
        10,
        mockWaitTimePrediction.predictedWaitTime + Math.floor(Math.random() * 10 - 5)
      ),
      confidence: Math.min(99, mockWaitTimePrediction.confidence + Math.floor(Math.random() * 5 - 2)),
    }
  },

  getCrowdPredictions: async (): Promise<CrowdPrediction[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    // Add slight randomization to mock predictions
    return mockCrowdPredictions.map((pred) => ({
      ...pred,
      percentage: Math.max(0, Math.min(100, pred.percentage + Math.floor(Math.random() * 10 - 5))),
    }))
  },

  getRecommendations: async (): Promise<AIRecommendation[]> => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return mockAIRecommendations
  },

  getServiceBottlenecks: async (): Promise<{ service: string; issue: string; impact: string }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        service: 'Billing',
        issue: 'Average service time is 27% higher than benchmark',
        impact: 'Increases overall queue wait time by ~4 minutes',
      },
      {
        service: 'Cardiology',
        issue: 'High complexity procedures causing delays',
        impact: 'Potential bottleneck during peak hours',
      },
    ]
  },

  getResourceRecommendations: async (): Promise<{ timeSlot: string; recommendation: string; expectedSavings: string }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [
      {
        timeSlot: '10:00 AM - 12:00 PM',
        recommendation: 'Add 1 counter to General OPD',
        expectedSavings: '6-8 minutes average wait time reduction',
      },
      {
        timeSlot: '2:00 PM - 4:00 PM',
        recommendation: 'Increase Billing staff from 2 to 3',
        expectedSavings: '4-5 minutes average wait time reduction',
      },
    ]
  },

  getPredictedDemand: async (days: number = 7): Promise<{ date: string; predictedVisitors: number; confidence: number }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    const data = []
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      data.push({
        date: date.toISOString().split('T')[0],
        predictedVisitors: Math.floor(400 + Math.random() * 200),
        confidence: Math.floor(75 + Math.random() * 20),
      })
    }
    return data
  },
}
