import { ActionTree } from 'vuex';
import { PlayersState, PLAYERS_LOADED, ADD_PLAYER, UPDATE_PLAYER } from './types';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { IPlayer } from '@/db/tichudb';
import { Player } from '@/db/entity';


export const actions: ActionTree<PlayersState, RootState> = {
  async loadPlayers({ commit }): Promise<any> {
    const players: IPlayer[] = await repos.players.getAll();
    commit(PLAYERS_LOADED, players);
  },
  async createPlayer({ commit }, player: Player ): Promise<Player> {
    const newPlayer = await repos.players.create(player);
    commit(ADD_PLAYER, newPlayer);
    return newPlayer;
  },
  async updatePlayer({ commit }, player: Player): Promise<Player> {
    await repos.players.update(player);
    commit(UPDATE_PLAYER, player);
    return player;
  },
};
