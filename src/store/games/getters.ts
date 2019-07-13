import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { GamesState } from './types';
import { Game, Team } from '@/db/entity';
import { repos } from '@/db/repos';

export const getters: GetterTree<GamesState, RootState> = {
    game(state) {
        return (id: number) => state.games.find((value) => value.id === id);
    },
    games(state) {
        return state.games.sort((lhs, rhs) => {
            if (lhs.date === rhs.date) {
                return 0;
            }
            if (lhs.date > rhs.date) {
                return -1;
            }
            return 1;
        });
    },
};
