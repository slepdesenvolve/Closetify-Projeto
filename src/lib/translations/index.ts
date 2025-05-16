
import { general } from './general';
import { auth } from './auth';
import { wardrobe } from './wardrobe';
import { profile } from './profile';
import { clothing } from './clothing';
import { navigation } from './navigation';
import { home } from './home';

export type Translations = {
  general: typeof general.en;
  auth: typeof auth.en;
  wardrobe: typeof wardrobe.en;
  profile: typeof profile.en;
  clothing: typeof clothing.en;
  navigation: typeof navigation.en;
  home: typeof home.en;
  error?: string;
};

// Combine all translation sections
export const translations: Record<string, Translations> = {
  en: {
    general: general.en,
    auth: auth.en,
    wardrobe: wardrobe.en,
    profile: profile.en,
    clothing: clothing.en,
    navigation: navigation.en,
    home: home.en,
  },
  pt: {
    general: general.pt,
    auth: auth.pt,
    wardrobe: wardrobe.pt,
    profile: profile.pt,
    clothing: clothing.pt,
    navigation: navigation.pt,
    home: home.pt,
    error: "Erro" // Adding missing error translation
  },
};
