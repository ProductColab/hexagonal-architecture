import { Repository } from '../shared/Repository';
import { Competitor } from './Competitor';
import { MarketPosition, MarketPositioning } from './MarketPosition';
import { CompetitorId } from './value-objects/CompetitorId';
import { CompetitorName } from './value-objects/CompetitorName';
import { MarketShare } from './value-objects/MarketShare';

export interface CompetitorRepository extends Repository<Competitor> {
  findByName(name: CompetitorName): Promise<Competitor | null>;
  findByIndustry(industry: string): Promise<Competitor[]>;
  findByMarketPosition(positioning: MarketPositioning): Promise<Competitor[]>;
  findCompetitorsWithMarketShareAbove(threshold: MarketShare): Promise<Competitor[]>;

  /**
   * Updates only the market position of a competitor.
   * This is a specific domain operation that might be optimized at the infrastructure level.
   */
  updateMarketPosition(id: CompetitorId, newPosition: MarketPosition): Promise<void>;
} 