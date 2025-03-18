import { CompetitorId } from '../competitor/value-objects/CompetitorId';

export abstract class Entity {
  protected readonly id: CompetitorId;

  constructor(id: CompetitorId) {
    this.id = id;
  }

  public getId(): CompetitorId {
    return this.id;
  }

  public equals(other: Entity): boolean {
    if (!(other instanceof Entity)) {
      return false;
    }
    return this.id.equals(other.id);
  }
} 