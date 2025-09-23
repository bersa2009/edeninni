export const theme = {
  colors: {
    // Pastel colors for accessibility and modern look
    primary: '#7E57C2', // Purple for primary actions
    secondary: '#81C784', // Light green
    accent: '#FFB74D', // Light orange
    
    // Recording states
    recording: '#E74C3C', // Red for recording
    idle: '#7E57C2', // Purple for idle
    
    // Result backgrounds (pastel)
    hunger: '#E6F5ED', // Light green
    gas: '#FCE8D9', // Light orange  
    fatigue: '#E7F0FF', // Light blue
    
    // UI colors
    background: '#F5F3FF', // Very light purple
    surface: '#FFFFFF',
    text: '#2D3748',
    textSecondary: '#718096',
    border: '#E2E8F0',
    warning: '#FDEDD3', // Light yellow for banners
    
    // Shadows
    shadow: '#000000',
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  typography: {
    title: {
      fontSize: 26,
      fontWeight: '800' as const,
      color: '#2D3748',
    },
    heading: {
      fontSize: 22,
      fontWeight: '700' as const,
      color: '#2D3748',
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      color: '#2D3748',
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#718096',
    },
    button: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: '#FFFFFF',
    },
  },
  
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 14,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 4,
    },
  },
};