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
  @dataProperty()
  public id?: number;

  public hydrate(data: ITichuTable) {
    const properties: string[] = Reflect.getMetadata(metadataKey, this);
    const values: { [index: string]: any } = {};
    properties.forEach((key) => { values[key] = data[key]; });
    Object.assign(this, values);
  }

  public toData(): ITichuTable {
    const data: ITichuTable = getDataProperties(this);
    return data;
  }
}
