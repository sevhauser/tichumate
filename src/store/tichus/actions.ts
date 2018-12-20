import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { TichusState, TICHUS_LOADED, ADD_TICHU, UPDATE_TICHU, DELETE_TICHU } from './types';
import { Tichu } from '@/db/entity';


export const actions: ActionTree<TichusState, RootState> = {
  async loadTichus({ commit }): Promise<any> {
    const tichus: Tichu[] = await repos.tichus.getAll();
    commit(TICHUS_LOADED, tichus);
  },
  async createTichu({ commit }, tichu: Tichu): Promise<any> {
    const newTichu = await repos.tichus.create(tichu);
    commit(ADD_TICHU, newTichu);
    return newTichu.id;
  },
  async saveTichu({ commit }, tichu: Tichu) {
    if (!tichu.protected) {
      const updatedTichu = await repos.tichus.update(tichu);
      commit(UPDATE_TICHU, updatedTichu);
    }
  },
  async deleteTichu({ commit }, tichuId: number) {
    await repos.tichus.delete(tichuId);
    commit(DELETE_TICHU, tichuId);
  },
  async toggleTichuActive({ commit }, tichuId: number) {
    const tichu = await repos.tichus.get(tichuId);
    if (tichu.active === undefined) {
      tichu.active = true;
    }
    tichu.active = !tichu.active;
    await repos.tichus.update(tichu);
    commit(UPDATE_TICHU, tichu);
  },
};
