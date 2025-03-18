export class MarketShare {
  private constructor(private readonly value: number) {
    if (value < 0 || value > 100) {
      throw new Error('Market share must be between 0 and 100 percent');
    }
  }

  public static fromPercentage(percentage: number): MarketShare {
    return new MarketShare(percentage);
  }

  public toPercentage(): number {
    return this.value;
  }

  public equals(other: MarketShare): boolean {
    return this.value === other.value;
  }

  public isGreaterThan(other: MarketShare): boolean {
    return this.value > other.value;
  }

  public isLessThan(other: MarketShare): boolean {
    return this.value < other.value;
  }
} 