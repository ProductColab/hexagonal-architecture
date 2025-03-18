import { MarketShare } from './value-objects/MarketShare';
import { LastUpdated } from './value-objects/LastUpdated';

export class MarketPosition {
  constructor(
    private readonly marketShare: MarketShare,
    private readonly competitiveAdvantages: string[],
    private readonly positioning: MarketPositioning,
    private readonly lastUpdated: LastUpdated
  ) { }

  public getMarketShare(): MarketShare {
    return this.marketShare;
  }

  public getCompetitiveAdvantages(): string[] {
    return [...this.competitiveAdvantages];
  }

  public getPositioning(): MarketPositioning {
    return this.positioning;
  }

  public getLastUpdated(): LastUpdated {
    return this.lastUpdated;
  }
}

export enum MarketPositioning {
  LEADER = 'LEADER',
  CHALLENGER = 'CHALLENGER',
  FOLLOWER = 'FOLLOWER',
  NICHE = 'NICHE'
} 