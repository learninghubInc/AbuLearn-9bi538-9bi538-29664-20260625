// Powered by OnSpace.AI
// Mock authentication backed by local storage
import { storage, STORAGE_KEYS } from './storage';
import { User } from './types';

interface StoredUser extends User {
  password: string;
}

function makeId(): string {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export const authService = {
  async getCurrent(): Promise<User | null> {
    return storage.get<User>(STORAGE_KEYS.user);
  },

  async signUp(name: string, email: string, password: string): Promise<User> {
    const normalized = email.trim().toLowerCase();
    const users = (await storage.get<StoredUser[]>(STORAGE_KEYS.users)) ?? [];
    if (users.some((u) => u.email === normalized)) {
      throw new Error('An account with this email already exists.');
    }
    const newUser: StoredUser = {
      id: makeId(),
      name: name.trim(),
      email: normalized,
      isPremium: false,
      password,
    };
    users.push(newUser);
    await storage.set(STORAGE_KEYS.users, users);
    const { password: _pw, ...publicUser } = newUser;
    await storage.set(STORAGE_KEYS.user, publicUser);
    return publicUser;
  },

  async logIn(email: string, password: string): Promise<User> {
    const normalized = email.trim().toLowerCase();
    const users = (await storage.get<StoredUser[]>(STORAGE_KEYS.users)) ?? [];
    const found = users.find((u) => u.email === normalized && u.password === password);
    if (!found) {
      throw new Error('Invalid email or password.');
    }
    const { password: _pw, ...publicUser } = found;
    await storage.set(STORAGE_KEYS.user, publicUser);
    return publicUser;
  },

  async logOut(): Promise<void> {
    await storage.remove(STORAGE_KEYS.user);
  },

  async setPremium(userId: string, isPremium: boolean): Promise<User | null> {
    const users = (await storage.get<StoredUser[]>(STORAGE_KEYS.users)) ?? [];
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;
    users[idx].isPremium = isPremium;
    await storage.set(STORAGE_KEYS.users, users);
    const { password: _pw, ...publicUser } = users[idx];
    await storage.set(STORAGE_KEYS.user, publicUser);
    return publicUser;
  },
};
