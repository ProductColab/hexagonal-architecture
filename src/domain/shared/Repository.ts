import { Entity } from './Entity';
import { CompetitorId } from '../competitor/value-objects/CompetitorId';

export interface Repository<T extends Entity> {
  save(entity: T): Promise<void>;
  findById(id: CompetitorId): Promise<T | null>;
  delete(id: CompetitorId): Promise<void>;
  exists(id: CompetitorId): Promise<boolean>;
} 