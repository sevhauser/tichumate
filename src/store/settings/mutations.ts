import { MutationTree } from 'vuex';
import { Setting } from '@/db/entity';
import { SettingsState, SETTINGS_LOADED, UPDATE_SETTING, LANGUAGES_LOADED } from './types';
import { LanguageValues } from '@/locale/languages';

export const mutations: MutationTree<SettingsState> = {
    [SETTINGS_LOADED](state, payload: Setting[]) {
        state.settings = payload;
    },
    [UPDATE_SETTING](state, payload: Setting) {
        const setting = state.settings.find((value) => value.id === payload.id);
        if (setting !== undefined) {
            Object.assign(setting, payload);
        }
    },
    [LANGUAGES_LOADED](state, payload: LanguageValues[]) {
        state.languages = payload;
    },
};
