import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SettingsState } from './types';
import { RootState } from '../types';
import { Setting } from '@/db/entity';
import { LanguageValues } from '@/locale/languages';

export const state: SettingsState = {
    settings: new Array<Setting>(),
    languages: new Array<LanguageValues>(),
};

const namespaced: boolean = true;

export const settings: Module<SettingsState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
    getters,
};
