// Powered by OnSpace.AI
// Local persistence wrapper (mock backend)
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      // silent fail
    }
  },
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      // silent fail
    }
  },
};

export const STORAGE_KEYS = {
  user: 'abulearn:user',
  users: 'abulearn:users',
  progress: 'abulearn:progress',
} as const;
