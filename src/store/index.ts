import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { players } from './players';
import { rules } from './rules';
import { tichus } from './tichus';
import { games } from './games';
import { settings } from './settings';
import { tour } from './tour';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '0.0.1',
    },
    actions: {
        async initialize({ dispatch }) {
            await dispatch('players/loadPlayers');
            await dispatch('rules/loadRules');
            await dispatch('tichus/loadTichus');
            await dispatch('games/loadGames');
            await dispatch('settings/loadSettings');
            await dispatch('settings/loadLanguages');
        },
    },
    modules: {
        players,
        rules,
        tichus,
        games,
        settings,
        tour,
    },
};

export default new Vuex.Store<RootState>(store);
