// Powered by OnSpace.AI
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fontWeight, radius, shadow, spacing } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { BadgeChip } from '@/components/ui/BadgeChip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { UpgradeModal } from '@/components/feature/UpgradeModal';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { useCourses } from '@/hooks/useCourses';
import { BADGES } from '@/services/progressService';
import { useAlert } from '@/template';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logOut, unlockPremium } = useAuth();
  const { progress } = useProgress();
  const { totalLessons } = useCourses();
  const { showAlert } = useAlert();
  const [upgradeVisible, setUpgradeVisible] = useState(false);

  const completed = useMemo(
    () => Object.values(progress.lessons).filter((p) => p >= 100).length,
    [progress],
  );
  const overall = totalLessons > 0 ? (completed / totalLessons) * 100 : 0;

  const initials = (user?.name ?? 'S')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const handleLogout = () => {
    showAlert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        style: 'destructive',
        onPress: async () => {
          await logOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const handleUnlocked = async () => {
    await unlockPremium();
    setUpgradeVisible(false);
    showAlert('Premium Unlocked', 'You now have full access to all premium courses.');
  };

  return (
    <View style={styles.screen}>
      <LinearGradient colors={[colors.primaryDark, colors.primary]} style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <View style={[styles.tier, user?.isPremium ? styles.tierPremium : styles.tierFree]}>
          <MaterialIcons
            name={user?.isPremium ? 'workspace-premium' : 'person'}
            size={14}
            color={user?.isPremium ? colors.surfaceDeep : colors.textInverse}
          />
          <Text style={[styles.tierText, user?.isPremium && { color: colors.surfaceDeep }]}>
            {user?.isPremium ? 'Premium Member' : 'Free Member'}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.flex1}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Overall Progress</Text>
          <View style={styles.progressTop}>
            <Text style={styles.percent}>{Math.round(overall)}%</Text>
            <Text style={styles.progressMeta}>
              {completed} of {totalLessons} lessons
            </Text>
          </View>
          <ProgressBar percent={overall} height={12} />
        </View>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgesRow}
        >
          <BadgeChip
            label={BADGES.quickLearner}
            icon="bolt"
            earned={progress.badges.includes(BADGES.quickLearner)}
            description="Pass your first quiz"
          />
          <BadgeChip
            label={BADGES.courseMaster}
            icon="military-tech"
            earned={progress.badges.includes(BADGES.courseMaster)}
            description="Complete a full course"
          />
        </ScrollView>

        {!user?.isPremium ? (
          <View style={styles.upgradeCard}>
            <MaterialIcons name="workspace-premium" size={28} color={colors.premium} />
            <Text style={styles.upgradeTitle}>Unlock Premium</Text>
            <Text style={styles.upgradeText}>
              Get full access to all premium courses for 1000 ETB via Telebirr.
            </Text>
            <Button title="Upgrade Now" variant="premium" onPress={() => setUpgradeVisible(true)} />
          </View>
        ) : null}

        <View style={{ marginTop: spacing.lg }}>
          <Button
            title="Log Out"
            variant="outline"
            icon={<MaterialIcons name="logout" size={18} color={colors.primary} />}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>

      <UpgradeModal
        visible={upgradeVisible}
        onClose={() => setUpgradeVisible(false)}
        onUnlocked={handleUnlocked}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  flex1: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: { color: colors.textInverse, fontSize: fontSize.xxl, fontWeight: fontWeight.bold },
  name: { color: colors.textInverse, fontSize: fontSize.xl, fontWeight: fontWeight.bold },
  email: { color: 'rgba(255,255,255,0.75)', fontSize: fontSize.sm, marginTop: 2 },
  tier: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginTop: spacing.md,
  },
  tierFree: { backgroundColor: 'rgba(255,255,255,0.18)' },
  tierPremium: { backgroundColor: colors.premiumLight },
  tierText: { color: colors.textInverse, fontSize: fontSize.xs, fontWeight: fontWeight.bold },
  content: { padding: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...(shadow.sm as object),
  },
  cardTitle: { fontSize: fontSize.md, fontWeight: fontWeight.semibold, color: colors.text },
  progressTop: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: spacing.sm, marginBottom: spacing.xs },
  percent: { fontSize: fontSize.xxl, fontWeight: fontWeight.bold, color: colors.primary },
  progressMeta: { fontSize: fontSize.sm, color: colors.textSubtle },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.md },
  badgesRow: { gap: spacing.md, paddingRight: spacing.lg },
  upgradeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.premiumLight,
    gap: spacing.sm,
  },
  upgradeTitle: { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.text },
  upgradeText: { fontSize: fontSize.sm, color: colors.textSubtle, textAlign: 'center', lineHeight: 20, marginBottom: spacing.sm },
});
