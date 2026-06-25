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
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuth } from '@/hooks/useAuth';
import { useAlert } from '@/template';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { logIn } = useAuth();
  const { showAlert } = useAlert();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: { email?: string; password?: string } = {};
    if (!email.includes('@')) e.email = 'Enter a valid email';
    if (password.length < 6) e.password = 'Minimum 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await logIn(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      showAlert('Login Failed', err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.primaryDark, colors.primary]} style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.brandRow}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} contentFit="contain" />
          <Text style={styles.brand}>AbuLearn Academy</Text>
        </View>
        <Image source={require('@/assets/images/auth-hero.png')} style={styles.heroImg} contentFit="contain" transition={250} />
        <Text style={styles.heroTitle}>Learn. Grow. Achieve.</Text>
        <Text style={styles.heroSubtitle}>Welcome back to your learning journey.</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.formWrap}>
        <ScrollView
          contentContainerStyle={[styles.form, { paddingBottom: insets.bottom + spacing.xl }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.formTitle}>Log In</Text>

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
            placeholder="Your password"
            secureTextEntry
            error={errors.password}
          />

          <Button title="Log In" onPress={handleLogin} loading={loading} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>New to AbuLearn?</Text>
            <Pressable onPress={() => router.push('/(auth)/signup')} hitSlop={8}>
              <Text style={styles.link}>Create account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.primaryDark },
  hero: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, alignSelf: 'flex-start' },
  logo: { width: 32, height: 32 },
  brand: { color: colors.textInverse, fontSize: fontSize.lg, fontWeight: fontWeight.bold },
  heroImg: { width: 170, height: 190, marginTop: spacing.sm },
  heroTitle: { color: colors.textInverse, fontSize: fontSize.xxl, fontWeight: fontWeight.bold, marginTop: spacing.sm },
  heroSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: fontSize.sm, marginTop: 4 },
  formWrap: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -20,
  },
  form: { padding: spacing.lg },
  formTitle: { fontSize: fontSize.xl, fontWeight: fontWeight.bold, color: colors.text, marginBottom: spacing.lg },
  footer: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, marginTop: spacing.lg },
  footerText: { color: colors.textSubtle, fontSize: fontSize.sm },
  link: { color: colors.primary, fontSize: fontSize.sm, fontWeight: fontWeight.bold },
});
