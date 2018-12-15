import { Game, Score, Round, Team, Call } from '../entity';
import { repos } from '../repos';


interface TeamRoundStats {
  roundNumber: number;
  points: number;
  totalPoints: number;
  win: number;
  calls: Call[];
}

interface TeamStats {
  teamId: number;
  teamName: string;
  wins: number;
  doubleWins: number;
  longestWinStreak: number;
  averagePoints: number;
  tichus: {[ key: number ]: { success: 0, fail: 0}};
  rounds: TeamRoundStats[];
}

export class GameStatisticsProvider {
  public game: Game;

  public gameId: number = 0;

  public rounds: Round[] = new Array<Round>();

  public teamScores: TeamStats[] = new Array<TeamStats>();

  constructor(game: Game) {
    this.game = game;
    if (game.id) {
      this.gameId = game.id;
    }
  }

  public async init(): Promise<void> {
    await this.loadData();
    await this.processData();
  }

  public getTeamStats(teamId: number) {
    const stats = this.teamScores.find((el) => el.teamId === teamId);
    return stats;
  }

  private async loadData(): Promise<void> {
    this.rounds = await repos.rounds.getAllFromGame(this.gameId);
  }

  private async processData(): Promise<void> {
    for (const team of this.game.teams) {
      await this.generateTeamStatistics(team);
    }
  }

  private async generateTeamStatistics(team: Team): Promise<void> {
    if (!team.id) {
      return;
    }

    const teamStats: TeamStats = {
      teamId: team.id,
      teamName: team.name,
      wins: 0,
      doubleWins: 0,
      longestWinStreak: 0,
      averagePoints: 0,
      tichus: {},
      rounds: new Array<TeamRoundStats>(),
    };

    let roundNumber = 1;
    let totalPoints = 0;
    let currentWinStreak = 0;
    for (const round of this.rounds) {
      const score = round.getTeamScore(team.id);
      totalPoints += score ? score.points : 0;
      const stats: TeamRoundStats = {
        roundNumber,
        totalPoints,
        points: score ? score.points : 0,
        win: score ? score.win : 0,
        calls: score ? score.calls : [],
      };
      teamStats.rounds.push(stats);
      if (score) {
        if (score.win > 0) {
          currentWinStreak += 1;
          teamStats.wins += score.win > 0 ? 1 : 0;
          teamStats.doubleWins += score.win === 2 ? 1 : 0;
        } else {
          currentWinStreak = 0;
        }
        if (currentWinStreak > teamStats.longestWinStreak) {
          teamStats.longestWinStreak = currentWinStreak;
        }
        for (const call of score.calls) {
          if (!teamStats.tichus[call.tichuId]) {
            teamStats.tichus[call.tichuId] = {
              success: 0,
              fail: 0,
            };
          }
          if (call.success > 0) {
            teamStats.tichus[call.tichuId].success += 1;
          } else if (call.success < 0) {
            teamStats.tichus[call.tichuId].fail += 1;
          }
        }
        teamStats.averagePoints = Math.floor(totalPoints / roundNumber);
      }
      roundNumber += 1;
    }
    this.teamScores.push(teamStats);
  }
}
