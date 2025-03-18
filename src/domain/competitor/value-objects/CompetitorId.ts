import { v4 as uuidv4 } from 'uuid';

export class CompetitorId {
  private constructor(private readonly value: string) {
    if (!value) {
      throw new Error('Competitor ID cannot be empty');
    }
  }

  public static create(): CompetitorId {
    return new CompetitorId(uuidv4());
  }

  public static fromString(id: string): CompetitorId {
    return new CompetitorId(id);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: CompetitorId): boolean {
    return this.value === other.value;
  }
} 