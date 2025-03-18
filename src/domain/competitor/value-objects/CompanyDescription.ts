export class CompanyDescription {
  private constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Company description cannot be empty');
    }
    if (value.length > 2000) {
      throw new Error('Company description cannot be longer than 2000 characters');
    }
  }

  public static create(description: string): CompanyDescription {
    return new CompanyDescription(description.trim());
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: CompanyDescription): boolean {
    return this.value === other.value;
  }
} 