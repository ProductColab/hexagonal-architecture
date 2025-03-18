export class CompetitorName {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Competitor name cannot be empty');
    }
    if (value.length > 100) {
      throw new Error('Competitor name cannot be longer than 100 characters');
    }
  }

  public static create(name: string): CompetitorName {
    return new CompetitorName(name.trim());
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: CompetitorName): boolean {
    return this.value === other.value;
  }
} 