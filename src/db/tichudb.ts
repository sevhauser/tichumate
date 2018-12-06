import Dexie from 'dexie';

export class TichuDB extends Dexie {
  public tichus: Dexie.Table<ITichu, number>;
  public rules: Dexie.Table<IRule, number>;
  public players: Dexie.Table<IPlayer, number>;
  public teams: Dexie.Table<ITeam, number>;
  public games: Dexie.Table<ITeam, number>;
  public rounds: Dexie.Table<IRound, number>;
  public scores: Dexie.Table<IScore, number>;
  public calls: Dexie.Table<ICall, number>;

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
    });
    this.open();
  }
}

export interface ITichuTable {
  [key: string]: any;
  id?: number;
}

export interface ITichu extends ITichuTable {
  title: string;
  lang: string;
  value: number;
  protected: boolean;
}

export interface IPlayer extends ITichuTable {
  name: string;
  emoji: string;
}

export interface IRule extends ITichuTable {
  key: string;
  lang: string;
  title: string;
}

export interface ITeam extends ITichuTable {
  playerIds: number[];
}

export interface IGame extends ITichuTable {
  teamIds: number[];
}

export interface IRound extends ITichuTable {
  gameId: number;
}

export interface IScore extends ITichuTable {
  roundId: number;
  teamId: number;
}

export interface ICall extends ITichuTable {
  scoreId: number;
  playerId?: number;
  tichuId: number;
  success: boolean;
}
