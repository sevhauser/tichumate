import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { SettingsState } from './types';

export const getters: GetterTree<SettingsState, RootState> = {
    setting(state) {
        return (key: string) => state.settings.find((value) => value.key === key);
    },
};
