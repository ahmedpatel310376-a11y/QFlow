export const theme = {
  colors: {
    primary: '#3d4ed9',
    primaryLight: '#5566ff',
    primaryDark: '#2e3cb0',
    secondary: '#06d6d6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    textMuted: '#6b7280',
    border: '#e5e7eb',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
}

export const getCrowdColor = (level: 'low' | 'moderate' | 'high' | string): string => {
  switch (level) {
    case 'low':
      return 'text-green-600'
    case 'moderate':
      return 'text-amber-600'
    case 'high':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

export const getCrowdBgColor = (level: 'low' | 'moderate' | 'high' | string): string => {
  switch (level) {
    case 'low':
      return 'bg-green-50'
    case 'moderate':
      return 'bg-amber-50'
    case 'high':
      return 'bg-red-50'
    default:
      return 'bg-gray-50'
  }
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'waiting':
      return 'text-blue-600'
    case 'almost_your_turn':
      return 'text-amber-600'
    case 'serving':
      return 'text-green-600'
    case 'completed':
      return 'text-green-600'
    case 'cancelled':
    case 'skipped':
      return 'text-red-600'
    case 'delayed':
      return 'text-amber-600'
    default:
      return 'text-gray-600'
  }
}
