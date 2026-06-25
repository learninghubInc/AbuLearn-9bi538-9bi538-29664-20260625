// Powered by OnSpace.AI
import { StyleSheet, View } from 'react-native';
import { colors, radius, spacing } from '@/constants/theme';

interface ProgressBarProps {
  percent: number;
  height?: number;
  trackColor?: string;
  fillColor?: string;
}

export function ProgressBar({
  percent,
  height = 8,
  trackColor = colors.surfaceAlt,
  fillColor = colors.accent,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor, borderRadius: height / 2 }]}>
      <View
        style={{
          width: `${clamped}%`,
          height: '100%',
          backgroundColor: fillColor,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
    marginVertical: spacing.xs,
    borderRadius: radius.full,
  },
});
