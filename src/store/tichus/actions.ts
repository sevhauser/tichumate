import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { TichusState, TICHUS_LOADED, ADD_TICHU, UPDATE_TICHU } from './types';
import { Tichu } from '@/db/entity';


export const actions: ActionTree<TichusState, RootState> = {
  async loadTichus({ commit }): Promise<any> {
    const tichus: Tichu[] = await repos.tichus.getAll();
    commit(TICHUS_LOADED, tichus);
  },
  async createTichu({ commit }, tichu: Tichu): Promise<any> {
    const newTichu = await repos.tichus.create(tichu);
    commit(ADD_TICHU, newTichu);
  },
  async saveTichu({ commit }, tichu: Tichu) {
    if (!tichu.protected) {
      const updatedTichu = await repos.tichus.update(tichu);
      commit(UPDATE_TICHU, updatedTichu);
    }
  },
};
