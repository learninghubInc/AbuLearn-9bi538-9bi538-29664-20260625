// Powered by OnSpace.AI
import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '@/constants/theme';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  ({ label, error, icon, style, ...rest }, ref) => {
    return (
      <View style={styles.wrap}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.inputRow, error ? styles.inputError : null]}>
          {icon ? <MaterialIcons name={icon} size={20} color={colors.textMuted} /> : null}
          <TextInput
            ref={ref}
            placeholderTextColor={colors.textMuted}
            accessibilityLabel={label}
            style={[styles.input, style]}
            {...rest}
          />
        </View>
        {error ? (
          <View style={styles.errorRow}>
            <MaterialIcons name="error-outline" size={14} color={colors.danger} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
      </View>
    );
  },
);

TextField.displayName = 'TextField';

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
    includeFontPadding: false,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
  },
  inputError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    paddingVertical: spacing.sm,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  errorText: {
    color: colors.danger,
    fontSize: fontSize.xs,
  },
});
