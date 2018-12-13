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

  /**
   * Returns a new instance of T.
   * @returns T
   */
  public abstract newEntity(...arg: any[]): T;

  /**
   * Returns a new instance of T and hydrates it with the provided data.
   * @param  {ITichuTable|undefined} data
   * @returns T - A hydrated instance
   */
  protected newHydratedEntity(data: ITichuTable | undefined, ...args: any): T {
    const entity: T = this.newEntity(args);
    this.hydrateEntity(entity, data);
    return entity;
  }

  /**
   * Hydrates entity with the provided data.
   * @param  {T} entity
   * @param  {ITichuTable|undefined} data
   * @returns void
   */
  public hydrateEntity(entity: T, data: ITichuTable | undefined): void {
    if (data !== undefined) {
      entity.hydrate(data);
    }
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

  public async update(element: T): Promise<T> {
    const result: number = await this.table.put(element.extractData());
    element.id = result;
    return element;
  }

  public async delete(id: number): Promise<void> {
    await this.table.delete(id);
  }

  public async create(element: T): Promise<T> {
    const id: number = await this.table.add(element.extractData());
    element.id = id;
    return element;
  }
}
