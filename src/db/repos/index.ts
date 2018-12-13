import { PlayerRepo } from './playerrepo';
import { RuleRepo } from './rulerepo';
import { GameRepo } from './gamerepo';
import { TeamRepo } from './teamrepo';
import { TichuRepo } from './tichurepo';
import { RoundRepo } from './roundrepo';

class RepoContainer {
  public players: PlayerRepo;
  public rules: RuleRepo;
  public games: GameRepo;
  public teams: TeamRepo;
  public tichus: TichuRepo;
  public rounds: RoundRepo;

  constructor() {
    this.players = new PlayerRepo();
    this.rules = new RuleRepo();
    this.games = new GameRepo();
    this.teams = new TeamRepo();
    this.tichus = new TichuRepo();
    this.rounds = new RoundRepo();
  }
}

const repos: RepoContainer = new RepoContainer();

export {
  repos,
};
