import { Competitor } from './Competitor';
import { CompetitorRepository } from './CompetitorRepository';
import { CompetitorId } from './value-objects/CompetitorId';
import { CompetitorName } from './value-objects/CompetitorName';
import { CompetitorProfile } from './CompetitorProfile';
import { MarketPosition, MarketPositioning } from './MarketPosition';
import { MarketShare } from './value-objects/MarketShare';
import { CompanyDescription } from './value-objects/CompanyDescription';
import { CreateCompetitorDto } from './dto/CreateCompetitorDto';
import { UpdateMarketPositionDto } from './dto/UpdateMarketPositionDto';
import { LastUpdated } from './value-objects/LastUpdated';

export class CompetitorService {
  constructor(private readonly repository: CompetitorRepository) { }

  async createCompetitor(dto: CreateCompetitorDto): Promise<CompetitorId> {
    const competitorId = CompetitorId.create();
    const competitorName = CompetitorName.create(dto.name);

    const profile = new CompetitorProfile(
      dto.industry,
      dto.size,
      dto.founded,
      CompanyDescription.create(dto.description)
    );

    const marketPosition = new MarketPosition(
      MarketShare.fromPercentage(dto.initialMarketShare),
      dto.competitiveAdvantages,
      dto.positioning,
      LastUpdated.now()
    );

    const competitor = new Competitor(
      competitorId,
      competitorName,
      profile,
      marketPosition
    );

    await this.repository.save(competitor);
    return competitorId;
  }

  async updateMarketPosition(
    competitorId: CompetitorId,
    dto: UpdateMarketPositionDto
  ): Promise<void> {
    const competitor = await this.repository.findById(competitorId);
    if (!competitor) {
      throw new Error(`Competitor with ID ${competitorId.toString()} not found`);
    }

    const newPosition = new MarketPosition(
      MarketShare.fromPercentage(dto.marketShare),
      dto.competitiveAdvantages,
      dto.positioning,
      LastUpdated.now()
    );

    await this.repository.updateMarketPosition(competitorId, newPosition);
  }

  async getCompetitorDetails(competitorId: CompetitorId): Promise<Competitor | null> {
    return this.repository.findById(competitorId);
  }

  async findCompetitorByName(name: string): Promise<Competitor | null> {
    return this.repository.findByName(CompetitorName.create(name));
  }

  async getCompetitorsInIndustry(industry: string): Promise<Competitor[]> {
    return this.repository.findByIndustry(industry);
  }

  async getMarketLeaders(threshold: number = 20): Promise<Competitor[]> {
    return this.repository.findCompetitorsWithMarketShareAbove(
      MarketShare.fromPercentage(threshold)
    );
  }

  async getCompetitorsByMarketPosition(positioning: MarketPositioning): Promise<Competitor[]> {
    return this.repository.findByMarketPosition(positioning);
  }

  async removeCompetitor(competitorId: CompetitorId): Promise<void> {
    const exists = await this.repository.exists(competitorId);
    if (!exists) {
      throw new Error(`Competitor with ID ${competitorId.toString()} not found`);
    }
    await this.repository.delete(competitorId);
  }
} 