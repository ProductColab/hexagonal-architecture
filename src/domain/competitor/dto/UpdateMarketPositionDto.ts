import { MarketPositioning } from '../MarketPosition';

export interface UpdateMarketPositionDto {
  marketShare: number;
  positioning: MarketPositioning;
  competitiveAdvantages: string[];
} 