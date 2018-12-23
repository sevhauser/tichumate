import { Player, Team, Game } from '../entity';
import { repos } from '../repos';

interface PlayerStats {
  firstGame: number;
  lastGame: number;
  numberOfGames: number;
  gamesWon: number;
  wins: number;
  doubleWins: number;
  roundsLost: number;
  calls: PlayerCallStats[];
}

interface PlayerCallStats {
  tichuId: number;
  success: number;
}

export class PlayerStatisticsProvider {
  public player: Player;

  public playerId: number = 0;

  public playerStats: PlayerStats = {
    firstGame: 0,
    lastGame: 0,
    numberOfGames: 0,
    gamesWon: 0,
    wins: 0,
    doubleWins: 0,
    roundsLost: 0,
    calls: new Array<PlayerCallStats>(),
  };

  public teams: Team[] = new Array<Team>();
  public teamIds: number[] = new Array<number>();
  public games: Game[] = new Array<Game>();

  constructor(player: Player) {
    this.player = player;
    if (player.id) {
      this.playerId = player.id;
    }
  }

  public async init(): Promise<void> {
    await this.loadData();
    await this.processData();
  }

  private async loadData(): Promise<void> {
    this.teams = await repos.teams.getFromPlayer(this.playerId);
    this.games = await repos.games.getFromPlayer(this.playerId);
  }

  private async processData(): Promise<void> {
    await this.processTeams();
    await this.processGames();
  }

  private async processTeams() {
    let wins = 0;
    for (const team of this.teams) {
      wins += team.win ? 1 : 0;
      if (team.id) {
        this.teamIds.push(team.id);
      }
    }
    this.playerStats.gamesWon = wins;
  }

  private async processGames() {
    let newestGame = 0;
    let oldestGame = Number.MAX_SAFE_INTEGER;
    for (const game of this.games) {
      if (newestGame < game.date) {
        newestGame = game.date;
      }
      if (oldestGame > game.date) {
        oldestGame = game.date;
      }
      if (oldestGame === Number.MAX_SAFE_INTEGER) {
        oldestGame = 0;
      }
      if (game.id) {
        await this.processRounds(game.id);
      }
    }
    this.playerStats.firstGame = oldestGame;
    this.playerStats.lastGame = newestGame;
    this.playerStats.numberOfGames = this.games.length;
  }

  private async processRounds(gameId: number) {
    const rounds = await repos.rounds.getAllFromGame(gameId);
    for (const round of rounds) {
      if (round.id) {
        const scores = await repos.scores.getAllFromRound(round.id);
        for (const score of scores) {
          if (this.teamIds.includes(score.teamId)) {
            this.playerStats.wins += score.win > 0 ? 1 : 0;
            this.playerStats.doubleWins += score.win > 1 ? 1 : 0;
            this.playerStats.roundsLost += score.win === 0 ? 1 : 0;
          }
        }
      }
    }
  }
}
