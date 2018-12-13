import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { players } from './players';
import { rules } from './rules';
import { tichus } from './tichus';
import { games } from './games';

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
        },
    },
    modules: {
        players,
        rules,
        tichus,
        games,
    },
};

export default new Vuex.Store<RootState>(store);
