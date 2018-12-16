import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { SettingsState, SETTINGS_LOADED, UPDATE_SETTING, LANGUAGES_LOADED } from './types';
import { Setting } from '@/db/entity';
import { languages } from '@/locale/languages';
import { SettingKey } from '@/db/entity/setting';
import i18n from '@/locale';


export const actions: ActionTree<SettingsState, RootState> = {
  async loadSettings({ commit }): Promise<any> {
    const settings: Setting[] = await repos.settings.getAll();
    commit(SETTINGS_LOADED, settings);
  },
  async updateSetting({ commit }, setting: Setting): Promise<Setting> {
    const updatedSetting = await repos.settings.update(setting);
    if (setting.key === SettingKey.LANG) {
      i18n.locale = setting.value;
    }
    commit(UPDATE_SETTING, updatedSetting);
    return updatedSetting;
  },
  async changeLanguage({ dispatch }, language: string): Promise<Setting> {
    const setting = await repos.settings.getByKey(SettingKey.LANG);
    if (setting) {
      setting.value = language;
    }
    return await dispatch('updateSetting', setting);
  },
  async loadLanguages({ commit }): Promise<any> {
    commit(LANGUAGES_LOADED, languages);
  },
};
