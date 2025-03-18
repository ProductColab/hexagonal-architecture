import { CompanyDescription } from './value-objects/CompanyDescription';

export class CompetitorProfile {
  constructor(
    private readonly industry: string,
    private readonly size: CompanySize,
    private readonly founded: Date,
    private readonly description: CompanyDescription
  ) { }

  public getIndustry(): string {
    return this.industry;
  }

  public getSize(): CompanySize {
    return this.size;
  }

  public getFounded(): Date {
    return new Date(this.founded.getTime());
  }

  public getDescription(): CompanyDescription {
    return this.description;
  }
}

export enum CompanySize {
  STARTUP = 'STARTUP',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  ENTERPRISE = 'ENTERPRISE'
} 