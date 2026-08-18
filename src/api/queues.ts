import { Queue, Token } from '../types'
import { mockQueues, mockCurrentToken } from '../data/mockData'

// Simulated queue service
let queues = [...mockQueues]
let tokens: Token[] = [mockCurrentToken]

export const queueService = {
  getQueues: async (): Promise<Queue[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return queues
  },

  getQueueById: async (queueId: string): Promise<Queue | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return queues.find((q) => q.id === queueId) || null
  },

  getQueuesByOrganization: async (organizationId: string): Promise<Queue[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return queues.filter((q) => q.organizationId === organizationId)
  },

  joinQueue: async (queueId: string, userId: string): Promise<Token> => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    const queue = queues.find((q) => q.id === queueId)
    if (!queue) throw new Error('Queue not found')

    const newToken: Token = {
      id: `token-${Date.now()}`,
      queueId,
      userId,
      number: `${queue.serviceName.substring(0, 1).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      status: 'waiting',
      positionInQueue: queue.waitingTokens.length + 1,
      estimatedWaitTime: queue.averageWaitTime,
      createdAt: new Date().toISOString(),
    }

    // Update queue
    queue.waitingTokens.push(newToken.number)
    queue.totalWaiting += 1

    tokens.push(newToken)
    return newToken
  },

  leaveQueue: async (tokenId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const tokenIndex = tokens.findIndex((t) => t.id === tokenId)
    if (tokenIndex === -1) throw new Error('Token not found')

    const token = tokens[tokenIndex]
    const queue = queues.find((q) => q.id === token.queueId)
    if (queue) {
      queue.waitingTokens = queue.waitingTokens.filter((t) => t !== token.number)
      queue.totalWaiting = Math.max(0, queue.totalWaiting - 1)
    }

    tokens.splice(tokenIndex, 1)
  },

  getUserCurrentToken: async (userId: string): Promise<Token | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return (
      tokens.find(
        (t) => t.userId === userId && ['waiting', 'almost_your_turn', 'serving'].includes(t.status)
      ) || null
    )
  },

  getTokenById: async (tokenId: string): Promise<Token | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return tokens.find((t) => t.id === tokenId) || null
  },

  updateTokenStatus: async (
    tokenId: string,
    status: Token['status']
  ): Promise<Token | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const token = tokens.find((t) => t.id === tokenId)
    if (token) {
      token.status = status
      if (status === 'completed') {
        token.completedAt = new Date().toISOString()
      }
    }
    return token || null
  },

  getQueueDetails: async (queueId: string): Promise<Queue | null> => {
    return queueService.getQueueById(queueId)
  },

  // Admin functions
  callNextToken: async (queueId: string): Promise<string | null> => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    const queue = queues.find((q) => q.id === queueId)
    if (!queue) throw new Error('Queue not found')

    if (queue.nextTokens.length > 0) {
      const nextToken = queue.nextTokens.shift()
      queue.currentToken = nextToken || queue.currentToken
      return nextToken || null
    }
    return null
  },

  pauseQueue: async (queueId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const queue = queues.find((q) => q.id === queueId)
    if (queue) {
      queue.status = 'paused'
    }
  },

  resumeQueue: async (queueId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const queue = queues.find((q) => q.id === queueId)
    if (queue) {
      queue.status = 'active'
    }
  },

  closeQueue: async (queueId: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300))
    const queue = queues.find((q) => q.id === queueId)
    if (queue) {
      queue.status = 'closed'
    }
  },
}

// Mock Queue update simulation
export const simulateQueueUpdates = (callback: (queues: Queue[]) => void) => {
  const interval = setInterval(() => {
    // Simulate queue changes
    queues.forEach((queue) => {
      if (queue.status === 'active' && Math.random() > 0.7) {
        if (queue.totalWaiting > 0) {
          queue.totalWaiting = Math.max(0, queue.totalWaiting - 1)
        }
        if (queue.nextTokens.length > 0) {
          queue.currentToken = queue.nextTokens.shift() || queue.currentToken
          queue.nextTokens.push(queue.waitingTokens.shift() || '')
        }
      }
    })
    callback([...queues])
  }, 5000)

  return () => clearInterval(interval)
}
