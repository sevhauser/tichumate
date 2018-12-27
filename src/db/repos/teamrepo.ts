import { BaseRepo } from './baserepo';
import { Team } from '../entity';
import { db } from '../';

export class TeamRepo extends BaseRepo<Team> {
  constructor() {
    super(db, db.table('teams'));
  }

  public newEntity(): Team {
    return new Team();
  }

  public async getFromGame(gameId: number): Promise<Team[]> {
    const teams = await this.table.where({ gameId }).toArray();
    const result: Team[] = new Array<Team>();
    for (const team of teams) {
      result.push(this.newHydratedEntity(team));
    }
    return result;
  }

  public async getFromPlayer(playerId: number): Promise<Team[]> {
    const result = new Array<Team>();
    const teams = await this.table.where('playerIds').equals(playerId).toArray();
    for (const teamValue of teams) {
      if (teamValue.id) {
        result.push(await this.get(teamValue.id));
      }
    }
    return result;
  }

  public async removePlayerFromTeams(playerId: number): Promise<void> {
    const teams = await this.table.where('playerIds').equals(playerId).toArray();
    for (const teamVals of teams) {
      if (teamVals.id) {
        const team = await this.get(teamVals.id);
        team.removePlayer(playerId);
        await this.update(team);
      }
    }
  }
}
