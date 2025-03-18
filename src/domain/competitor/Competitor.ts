import { Entity } from '../shared/Entity';
import { CompetitorProfile } from './CompetitorProfile';
import { MarketPosition } from './MarketPosition';
import { CompetitorId } from './value-objects/CompetitorId';
import { CompetitorName } from './value-objects/CompetitorName';

export class Competitor extends Entity {
  private readonly name: CompetitorName;
  private readonly profile: CompetitorProfile;
  private marketPosition: MarketPosition;

  constructor(
    id: CompetitorId,
    name: CompetitorName,
    profile: CompetitorProfile,
    marketPosition: MarketPosition
  ) {
    super(id);
    this.name = name;
    this.profile = profile;
    this.marketPosition = marketPosition;
  }

  public getName(): CompetitorName {
    return this.name;
  }

  public getProfile(): CompetitorProfile {
    return this.profile;
  }

  public getMarketPosition(): MarketPosition {
    return this.marketPosition;
  }

  public updateMarketPosition(newPosition: MarketPosition): void {
    this.marketPosition = newPosition;
  }
} 