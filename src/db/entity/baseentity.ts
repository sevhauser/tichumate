import 'reflect-metadata';
import { ITichuTable } from '../tichudb';

const metadataKey = Symbol('dataProperty');

export function dataProperty(): (target: object, propertyKey: string) => void {
  return registerDataProperty;
}

export function registerDataProperty(target: object, propertyKey: string): void {
  let properties: string[] = Reflect.getMetadata(metadataKey, target);
  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
  }
  Reflect.defineMetadata(metadataKey, properties, target);
}

export function getDataProperties(origin: { [index: string]: any }): ITichuTable {
  const properties: string[] = Reflect.getMetadata(metadataKey, origin);
  const result: { [index: string]: any } = {};
  properties.forEach((key) => {
    if (origin[key] === undefined) {
      return;
    }
    result[key] = origin[key];
  });
  return result as ITichuTable;
}

export class BaseEntity implements ITichuTable {
  public id?: number;

  /**
   * Hydrates the objects {@link dataProperty} properties. Here, {@link BaseEntity#afterHydration} is called after the
   * properties have been populated.
   * @param  {ITichuTable} data
   */
  public hydrate(data: ITichuTable) {
    const properties: string[] = Reflect.getMetadata(metadataKey, this);
    const values: { [index: string]: any } = {};
    properties.forEach((key) => { values[key] = data[key]; });
    Object.assign(this, values);
    this.afterHydration();
  }

  /**
   * Extracts {@link dataProperty} properties. Here, {@link BaseEntity#beforeExtraction} is called before the data is
   * extracted.
   * @returns ITichuTable
   */
  public extractData(): ITichuTable {
    this.beforeExtraction();
    const data: ITichuTable = getDataProperties(this);
    return data;
  }

  /**
   * Is called after {@link BaseEntity#hydrate} is completed.
   * Here, you can set up properties that are not a {@link dataProperty}
   * @returns void
   */
  protected afterHydration(): void {}

  /**
   * Is called before {@link BaseEntity#extractData} is called.
   * Here, you can make changes to {@link dataProperty} properties before they are saved - if needed.
   * @returns void
   */
  protected beforeExtraction(): void {}
}
