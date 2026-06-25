// Powered by OnSpace.AI
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/template';

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();
  const { showAlert } = useAlert();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (name.trim().length < 2) e.name = 'Enter your full name';
    if (!email.includes('@')) e.email = 'Enter a valid email';
    if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignup = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await signUp(name, email, password);
      router.replace('/(tabs)');
    } catch (err) {
      showAlert('Sign Up Failed', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.primaryDark, colors.primary]} style={[styles.hero, { paddingTop: insets.top + spacing.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.back}>
          <MaterialIcons name="arrow-back" size={24} color={colors.textInverse} />
        </Pressable>
        <Text style={styles.heroTitle}>Create Account</Text>
        <Text style={styles.heroSubtitle}>Start learning with AbuLearn Academy today.</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.formWrap}>
        <ScrollView
          contentContainerStyle={[styles.form, { paddingBottom: insets.bottom + spacing.xl }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TextField
            label="Full Name"
            icon="person-outline"
            value={name}
            onChangeText={setName}
            placeholder="Abebe Bekele"
            error={errors.name}
          />
          <TextField
            label="Email"
            icon="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <TextField
            label="Password"
            icon="lock-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            secureTextEntry
            error={errors.password}
          />

          <Button title="Create Account" variant="accent" onPress={handleSignup} loading={loading} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8}>
              <Text style={styles.link}>Log in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primaryDark },
  hero: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  back: { marginBottom: spacing.md },
  heroTitle: { color: colors.textInverse, fontSize: fontSize.xxl, fontWeight: fontWeight.bold },
  heroSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: fontSize.sm, marginTop: 4 },
  formWrap: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
  },
  form: { padding: spacing.lg, paddingTop: spacing.xl },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, marginTop: spacing.lg },
  footerText: { color: colors.textSubtle, fontSize: fontSize.sm },
  link: { color: colors.primary, fontSize: fontSize.sm, fontWeight: fontWeight.bold },
});
