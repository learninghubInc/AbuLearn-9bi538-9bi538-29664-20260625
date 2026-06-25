// Powered by OnSpace.AI
// Telebirr billing helper - triggers native dialer quick-string
import { Linking } from 'react-native';
import { TELEBIRR_DIAL_STRING } from './coursesData';

export const billingService = {
  async payWithTelebirr(): Promise<boolean> {
    try {
      await Linking.openURL(TELEBIRR_DIAL_STRING);
      return true;
    } catch {
      return false;
    }
  },
};
