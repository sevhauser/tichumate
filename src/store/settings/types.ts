import { Setting } from '@/db/entity';
import { LanguageValues } from '@/locale/languages';

export const SETTINGS_LOADED = 'SETTINGS_LOADED';
export const LANGUAGES_LOADED = 'LANGUAGES_LOADED';
export const UPDATE_SETTING = 'UPDATE_SETTING';

export interface SettingsState {
  settings: Setting[];
  languages: LanguageValues[];
}
