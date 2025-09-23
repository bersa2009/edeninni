export const colors = {
  background: '#FFF6E9',
  card: '#FFFFFF',
  primary: '#7E57C2',
  danger: '#E74C3C',
  text: '#0D1B2A',
  subtleText: '#344055',
  banner: '#FDEDD3',
  hunger: '#E6F5ED',
  gas: '#FCE8D9',
  fatigue: '#E7F0FF'
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32
};

export const typography = {
  h1: { fontSize: 26, fontWeight: '800' as const, color: colors.text },
  h2: { fontSize: 22, fontWeight: '700' as const, color: colors.text },
  body: { fontSize: 16, color: colors.subtleText },
  button: { fontSize: 16, fontWeight: '600' as const, color: '#fff' }
};

export const cardStyle = {
  backgroundColor: colors.card,
  borderRadius: 20,
  padding: spacing.lg
};

