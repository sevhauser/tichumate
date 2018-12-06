import { TichuDB } from '../';
import { BaseEntity } from '../entity';
import { Dexie } from 'dexie';
import { ITichuTable } from '../tichudb';

export abstract class BaseRepo<T extends BaseEntity> {
  protected db: TichuDB;
  protected table: Dexie.Table<ITichuTable, number>;

  constructor(db: TichuDB, table: Dexie.Table<ITichuTable, number>) {
    this.db = db;
    this.table = table;
  }

  public abstract newEntity(): T;

  protected newHydratedEntity(data: ITichuTable | undefined): T {
    const entity: T = this.newEntity();
    return this.hydrateEntity(entity, data);
  }

  public hydrateEntity(entity: T, data: ITichuTable | undefined): T {
    if (data !== undefined) {
      entity.hydrate(data);
    }
    return entity;
  }

  public async get(id: number): Promise<T> {
    const data: ITichuTable | undefined = await this.table.get(id);
    return this.newHydratedEntity(data);
  }

  public async getAll(): Promise<T[]> {
    const result: T[] = new Array<T>();
    const data = await this.table.toArray();
    data.forEach((dataElement: ITichuTable) => {
      result.push(this.newHydratedEntity(dataElement));
    });
    return result;
  }

  public async update(element: T): Promise<number> {
    const result: number = await this.table.put(element.toData());
    return result;
  }

  public async delete(id: number): Promise<void> {
    await this.table.delete(id);
  }

  public async create(element: T): Promise<T> {
    const id: number = await this.table.add(element.toData());
    element.id = id;
    return element;
  }
}
