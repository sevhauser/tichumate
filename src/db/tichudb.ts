import Dexie from 'dexie';
import { SettingKey } from './entity/setting';
import { detectLanguage } from '@/locale/languages';

export class TichuDB extends Dexie {
  public tichus: Dexie.Table<ITichu, number>;
  public rules: Dexie.Table<IRule, number>;
  public players: Dexie.Table<IPlayer, number>;
  public teams: Dexie.Table<ITeam, number>;
  public games: Dexie.Table<ITeam, number>;
  public rounds: Dexie.Table<IRound, number>;
  public scores: Dexie.Table<IScore, number>;
  public calls: Dexie.Table<ICall, number>;
  public settings: Dexie.Table<ISetting, number>;

  constructor() {
    super('TichuDB');

    this.version(1).stores({
      tichus: '++id',
      rules: '++id, key',
      players: '++id, name',
      teams: '++id, *playerIds',
      games: '++id, *teamIds',
      rounds: '++id, gameId',
      scores: '++id, roundId, teamId',
      calls: '++id, scoreId, playerId, tichuId, success',
    });
    // V2 - added settings
    this.version(2).stores({
      tichus: '++id',
      rules: '++id, key',
      players: '++id, name',
      teams: '++id, *playerIds',
      games: '++id, *teamIds',
      rounds: '++id, gameId',
      scores: '++id, roundId, teamId',
      calls: '++id, scoreId, playerId, tichuId, success',
      settings: '++id, &key',
    }).upgrade((tx) => {
      const userLanguage = detectLanguage();
      tx.table('settings').bulkAdd([
        {
          key: SettingKey.LANG,
          lang: 'settings.language',
          value: userLanguage,
        },
      ]);
    });

    // Assign tables
    this.tichus = this.table('tichus');
    this.rules = this.table('rules');
    this.players = this.table('players');
    this.teams = this.table('teams');
    this.games = this.table('games');
    this.games = this.table('games');
    this.rounds = this.table('rounds');
    this.scores = this.table('scores');
    this.calls = this.table('calls');
    this.settings = this.table('settings');

    // Populate with default values
    this.on('populate', () => {
      this.rules.add({
        key: 'score',
        lang: 'rule.score',
        title: '',
      });
      this.rules.add({
        key: 'difference',
        lang: 'rule.difference',
        title: '',
      });
      this.tichus.add({
        title: '',
        lang: 'call.tichu',
        value: 100,
        protected: true,
      });
      this.tichus.add({
        title: '',
        lang: 'call.grande',
        value: 200,
        protected: true,
      });
      const userLanguage = detectLanguage();
      this.settings.add({
        key: SettingKey.LANG,
        lang: 'settings.language',
        value: userLanguage,
      });
    });
    this.open();
  }
}

export interface ITichuTable {
  id?: number;
  [key: string]: any;
}

export interface ITichu extends ITichuTable {
  id?: number;
  title: string;
  lang: string;
  value: number;
  protected: boolean;
}

export interface IPlayer extends ITichuTable {
  id?: number;
  name: string;
  emoji: string;
}

export interface IRule extends ITichuTable {
  id?: number;
  key: string;
  lang: string;
  title: string;
}

export interface ITeam extends ITichuTable {
  id?: number;
  playerIds: number[];
  score: number;
}

export interface IGame extends ITichuTable {
  id?: number;
  teamIds: number[];
}

export interface IRound extends ITichuTable {
  id?: number;
  gameId: number;
}

export interface IScore extends ITichuTable {
  id?: number;
  roundId: number;
  teamId: number;
}

export interface ICall extends ITichuTable {
  id?: number;
  scoreId: number;
  playerId?: number;
  tichuId: number;
  success: number;
}

export interface ISetting extends ITichuTable {
  id?: number;
  key: string;
  lang: string;
  value: any;
}
