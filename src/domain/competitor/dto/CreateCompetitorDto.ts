import { MarketPositioning } from '../MarketPosition';
import { CompanySize } from '../CompetitorProfile';

export interface CreateCompetitorDto {
  name: string;
  industry: string;
  size: CompanySize;
  founded: Date;
  description: string;
  initialMarketShare: number;
  positioning: MarketPositioning;
  competitiveAdvantages: string[];
} 