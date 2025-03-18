import { describe, expect, it, beforeEach } from 'bun:test';
import { CompetitorService } from '../competitor/CompetitorService';
import { CompetitorRepository } from '../competitor/CompetitorRepository';
import { Competitor } from '../competitor/Competitor';
import { CompetitorId } from '../competitor/value-objects/CompetitorId';
import { CompetitorName } from '../competitor/value-objects/CompetitorName';
import { CompetitorProfile } from '../competitor/CompetitorProfile';
import { MarketPosition, MarketPositioning } from '../competitor/MarketPosition';
import { CompanyDescription } from '../competitor/value-objects/CompanyDescription';
import { MarketShare } from '../competitor/value-objects/MarketShare';
import { LastUpdated } from '../competitor/value-objects/LastUpdated';
import { CompanySize } from '../competitor/CompetitorProfile';
import { CreateCompetitorDto } from '../competitor/dto/CreateCompetitorDto';
import { UpdateMarketPositionDto } from '../competitor/dto/UpdateMarketPositionDto';

class MockCompetitorRepository implements CompetitorRepository {
  private competitors: Map<string, Competitor> = new Map();

  async save(competitor: Competitor): Promise<void> {
    this.competitors.set(competitor.getId().toString(), competitor);
  }

  async findById(id: CompetitorId): Promise<Competitor | null> {
    return this.competitors.get(id.toString()) || null;
  }

  async findByName(name: CompetitorName): Promise<Competitor | null> {
    return Array.from(this.competitors.values())
      .find(c => c.getName().equals(name)) || null;
  }

  async findByIndustry(industry: string): Promise<Competitor[]> {
    return Array.from(this.competitors.values())
      .filter(c => c.getProfile().getIndustry() === industry);
  }

  async findByMarketPosition(positioning: MarketPositioning): Promise<Competitor[]> {
    return Array.from(this.competitors.values())
      .filter(c => c.getMarketPosition().getPositioning() === positioning);
  }

  async findCompetitorsWithMarketShareAbove(threshold: MarketShare): Promise<Competitor[]> {
    return Array.from(this.competitors.values())
      .filter(c => c.getMarketPosition().getMarketShare().isGreaterThan(threshold));
  }

  async updateMarketPosition(id: CompetitorId, newPosition: MarketPosition): Promise<void> {
    const competitor = await this.findById(id);
    if (competitor) {
      competitor.updateMarketPosition(newPosition);
      await this.save(competitor);
    }
  }

  async delete(id: CompetitorId): Promise<void> {
    this.competitors.delete(id.toString());
  }

  async exists(id: CompetitorId): Promise<boolean> {
    return this.competitors.has(id.toString());
  }
}

describe('CompetitorService', () => {
  let repository: MockCompetitorRepository;
  let service: CompetitorService;

  beforeEach(() => {
    repository = new MockCompetitorRepository();
    service = new CompetitorService(repository);
  });

  describe('createCompetitor', () => {
    const createDto: CreateCompetitorDto = {
      name: 'Acme Corp',
      industry: 'Technology',
      size: CompanySize.ENTERPRISE,
      founded: new Date('2000-01-01'),
      description: 'A leading tech company',
      initialMarketShare: 25,
      positioning: MarketPositioning.LEADER,
      competitiveAdvantages: ['Strong Brand', 'Innovation']
    };

    it('should create and save a new competitor', async () => {
      const competitorId = await service.createCompetitor(createDto);
      const savedCompetitor = await repository.findById(competitorId);

      expect(savedCompetitor).not.toBeNull();
      expect(savedCompetitor?.getName().toString()).toBe(createDto.name);
      expect(savedCompetitor?.getProfile().getIndustry()).toBe(createDto.industry);
      expect(savedCompetitor?.getMarketPosition().getMarketShare().toPercentage()).toBe(createDto.initialMarketShare);
    });
  });

  describe('updateMarketPosition', () => {
    it('should update market position of existing competitor', async () => {
      // Create a competitor first
      const competitorId = await service.createCompetitor({
        name: 'Acme Corp',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date('2000-01-01'),
        description: 'A leading tech company',
        initialMarketShare: 25,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Strong Brand', 'Innovation']
      });

      const updateDto: UpdateMarketPositionDto = {
        marketShare: 30,
        positioning: MarketPositioning.CHALLENGER,
        competitiveAdvantages: ['Strong Brand', 'Innovation', 'Market Reach']
      };

      await service.updateMarketPosition(competitorId, updateDto);
      const updatedCompetitor = await repository.findById(competitorId);

      expect(updatedCompetitor).not.toBeNull();
      expect(updatedCompetitor?.getMarketPosition().getMarketShare().toPercentage()).toBe(updateDto.marketShare);
      expect(updatedCompetitor?.getMarketPosition().getPositioning()).toBe(updateDto.positioning);
      expect(updatedCompetitor?.getMarketPosition().getCompetitiveAdvantages()).toEqual(updateDto.competitiveAdvantages);
    });

    it('should throw error when updating non-existent competitor', async () => {
      const nonExistentId = CompetitorId.create();
      const updateDto: UpdateMarketPositionDto = {
        marketShare: 30,
        positioning: MarketPositioning.CHALLENGER,
        competitiveAdvantages: ['Strong Brand']
      };

      await expect(service.updateMarketPosition(nonExistentId, updateDto))
        .rejects.toThrow(`Competitor with ID ${nonExistentId.toString()} not found`);
    });
  });

  describe('getCompetitorDetails', () => {
    it('should return null for non-existent competitor', async () => {
      const nonExistentId = CompetitorId.create();
      const competitor = await service.getCompetitorDetails(nonExistentId);
      expect(competitor).toBeNull();
    });

    it('should return competitor details for existing competitor', async () => {
      const competitorId = await service.createCompetitor({
        name: 'Acme Corp',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date('2000-01-01'),
        description: 'A leading tech company',
        initialMarketShare: 25,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Strong Brand', 'Innovation']
      });

      const competitor = await service.getCompetitorDetails(competitorId);
      expect(competitor).not.toBeNull();
      expect(competitor?.getId()).toBe(competitorId);
    });
  });

  describe('findCompetitorByName', () => {
    it('should find competitor by exact name', async () => {
      const name = 'Acme Corp';
      await service.createCompetitor({
        name,
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date('2000-01-01'),
        description: 'A leading tech company',
        initialMarketShare: 25,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Strong Brand', 'Innovation']
      });

      const competitor = await service.findCompetitorByName(name);
      expect(competitor).not.toBeNull();
      expect(competitor?.getName().toString()).toBe(name);
    });

    it('should return null for non-existent name', async () => {
      const competitor = await service.findCompetitorByName('Non Existent Corp');
      expect(competitor).toBeNull();
    });
  });

  describe('getCompetitorsInIndustry', () => {
    it('should find all competitors in specified industry', async () => {
      // Create competitors in different industries
      await service.createCompetitor({
        name: 'Tech Corp 1',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date(),
        description: 'Tech company 1',
        initialMarketShare: 25,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Innovation']
      });

      await service.createCompetitor({
        name: 'Tech Corp 2',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date(),
        description: 'Tech company 2',
        initialMarketShare: 20,
        positioning: MarketPositioning.CHALLENGER,
        competitiveAdvantages: ['Innovation']
      });

      await service.createCompetitor({
        name: 'Finance Corp',
        industry: 'Finance',
        size: CompanySize.ENTERPRISE,
        founded: new Date(),
        description: 'Finance company',
        initialMarketShare: 30,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Brand']
      });

      const techCompetitors = await service.getCompetitorsInIndustry('Technology');
      expect(techCompetitors.length).toBe(2);
      expect(techCompetitors.every(c => c.getProfile().getIndustry() === 'Technology')).toBe(true);
    });
  });

  describe('getMarketLeaders', () => {
    it('should find competitors above market share threshold', async () => {
      // Create competitors with different market shares
      await service.createCompetitor({
        name: 'High Share Corp',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date(),
        description: 'High market share',
        initialMarketShare: 30,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Innovation']
      });

      await service.createCompetitor({
        name: 'Low Share Corp',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date(),
        description: 'Low market share',
        initialMarketShare: 15,
        positioning: MarketPositioning.FOLLOWER,
        competitiveAdvantages: ['Innovation']
      });

      const leaders = await service.getMarketLeaders(20);
      expect(leaders.length).toBe(1);
      expect(leaders[0].getMarketPosition().getMarketShare().toPercentage()).toBeGreaterThan(20);
    });
  });

  describe('removeCompetitor', () => {
    it('should remove existing competitor', async () => {
      const competitorId = await service.createCompetitor({
        name: 'To Be Removed Corp',
        industry: 'Technology',
        size: CompanySize.ENTERPRISE,
        founded: new Date(),
        description: 'Will be removed',
        initialMarketShare: 25,
        positioning: MarketPositioning.LEADER,
        competitiveAdvantages: ['Innovation']
      });

      await service.removeCompetitor(competitorId);
      const removed = await repository.findById(competitorId);
      expect(removed).toBeNull();
    });

    it('should throw error when removing non-existent competitor', async () => {
      const nonExistentId = CompetitorId.create();
      await expect(service.removeCompetitor(nonExistentId))
        .rejects.toThrow(`Competitor with ID ${nonExistentId.toString()} not found`);
    });
  });
}); 