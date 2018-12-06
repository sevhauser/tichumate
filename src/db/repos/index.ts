import { PlayerRepo } from './playerrepo';
import { RuleRepo } from './rulerepo';
import { GameRepo } from './gamerepo';
import { TeamRepo } from './teamrepo';

class RepoContainer {
  public players: PlayerRepo;
  public rules: RuleRepo;
  public games: GameRepo;
  public teams: TeamRepo;

  constructor() {
    this.players = new PlayerRepo();
    this.rules = new RuleRepo();
    this.games = new GameRepo();
    this.teams = new TeamRepo();
  }
}

const repos: RepoContainer = new RepoContainer();

export {
  repos,
};
