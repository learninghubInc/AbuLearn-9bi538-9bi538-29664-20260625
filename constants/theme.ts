// Powered by OnSpace.AI
// AbuLearn Academy - Design Tokens
import { Platform, TextStyle } from 'react-native';

export const colors = {
  // Brand - deep blue
  primary: '#1E3A8A',
  primaryDark: '#0F2167',
  primaryLight: '#3B5BDB',
  // Accent - clean green
  accent: '#10B981',
  accentDark: '#059669',
  success: '#16A34A',
  // Premium gold
  premium: '#F59E0B',
  premiumLight: '#FCD34D',
  // Surfaces
  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceAlt: '#EEF2FB',
  surfaceDeep: '#0F2167',
  // Text
  text: '#0F172A',
  textSubtle: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
  // Utility
  border: '#E2E8F0',
  danger: '#EF4444',
  overlay: 'rgba(15,23,42,0.6)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
  display: 34,
} as const;

export const fontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
};

export const shadow = {
  sm: Platform.select({
    ios: {
      shadowColor: '#0F2167',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
    },
    android: { elevation: 2 },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#0F2167',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.12,
      shadowRadius: 14,
    },
    android: { elevation: 5 },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#0F2167',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.18,
      shadowRadius: 24,
    },
    android: { elevation: 10 },
    default: {},
  }),
};

export const theme = { colors, spacing, radius, fontSize, fontWeight, shadow };
export type Theme = typeof theme;
