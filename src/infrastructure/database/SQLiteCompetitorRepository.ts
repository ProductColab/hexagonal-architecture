import { CompetitorRepository } from '../../domain/competitor/CompetitorRepository';
import { Competitor as CompetitorEntity } from '../../domain/competitor/Competitor';
import { CompetitorProfile, CompanySize } from '../../domain/competitor/CompetitorProfile';
import { MarketPosition as MarketPositionEntity, MarketPositioning } from '../../domain/competitor/MarketPosition';
import { CompetitorId } from '../../domain/competitor/value-objects/CompetitorId';
import { CompetitorName } from '../../domain/competitor/value-objects/CompetitorName';
import { MarketShare } from '../../domain/competitor/value-objects/MarketShare';
import { CompanyDescription } from '../../domain/competitor/value-objects/CompanyDescription';
import { LastUpdated } from '../../domain/competitor/value-objects/LastUpdated';
import { eq, gt, sql } from 'drizzle-orm';
import { DrizzleDatabase } from './DatabaseFactory';
import * as schema from './schema';

export class SQLiteCompetitorRepository implements CompetitorRepository {
  constructor(private readonly db: DrizzleDatabase) { }

  async save(competitor: CompetitorEntity): Promise<void> {
    const profile = competitor.getProfile();
    const marketPosition = competitor.getMarketPosition();

    await this.db.transaction(async (tx) => {
      // Save competitor
      await tx.insert(schema.competitors).values({
        id: competitor.getId().toString(),
        name: competitor.getName().toString(),
        industry: profile.getIndustry(),
        size: profile.getSize(),
        founded: profile.getFounded().toISOString(),
        description: profile.getDescription().toString(),
      });

      // Save market position
      await tx.insert(schema.marketPositions).values({
        id: crypto.randomUUID(),
        competitorId: competitor.getId().toString(),
        marketShare: marketPosition.getMarketShare().toPercentage(),
        positioning: marketPosition.getPositioning(),
        lastUpdated: sql`${marketPosition.getLastUpdated().toUnixTimestamp()}`,
      });

      // Save competitive advantages
      const advantages = marketPosition.getCompetitiveAdvantages();
      if (advantages.length > 0) {
        await tx.insert(schema.competitiveAdvantages).values(
          advantages.map(advantage => ({
            id: crypto.randomUUID(),
            competitorId: competitor.getId().toString(),
            advantage,
          }))
        );
      }
    });
  }

  async findById(id: CompetitorId): Promise<CompetitorEntity | null> {
    const competitor = await this.db.select()
      .from(schema.competitors)
      .where(eq(schema.competitors.id, id.toString()))
      .get();

    if (!competitor) return null;

    const marketPosition = await this.db.select()
      .from(schema.marketPositions)
      .where(eq(schema.marketPositions.competitorId, id.toString()))
      .get();

    const advantages = await this.db.select()
      .from(schema.competitiveAdvantages)
      .where(eq(schema.competitiveAdvantages.competitorId, id.toString()))
      .all();

    return this.mapToCompetitor(competitor, marketPosition, advantages);
  }

  async findByName(name: CompetitorName): Promise<CompetitorEntity | null> {
    const competitor = await this.db.select()
      .from(schema.competitors)
      .where(eq(schema.competitors.name, name.toString()))
      .get();

    if (!competitor) return null;

    const marketPosition = await this.db.select()
      .from(schema.marketPositions)
      .where(eq(schema.marketPositions.competitorId, competitor.id))
      .get();

    const advantages = await this.db.select()
      .from(schema.competitiveAdvantages)
      .where(eq(schema.competitiveAdvantages.competitorId, competitor.id))
      .all();

    return this.mapToCompetitor(competitor, marketPosition, advantages);
  }

  async findByIndustry(industry: string): Promise<CompetitorEntity[]> {
    const competitors = await this.db.select()
      .from(schema.competitors)
      .where(eq(schema.competitors.industry, industry))
      .all();

    return Promise.all(
      competitors.map(async (competitor) => {
        const marketPosition = await this.db.select()
          .from(schema.marketPositions)
          .where(eq(schema.marketPositions.competitorId, competitor.id))
          .get();

        const advantages = await this.db.select()
          .from(schema.competitiveAdvantages)
          .where(eq(schema.competitiveAdvantages.competitorId, competitor.id))
          .all();

        return this.mapToCompetitor(competitor, marketPosition, advantages);
      })
    );
  }

  async findByMarketPosition(positioning: MarketPositioning): Promise<CompetitorEntity[]> {
    const marketPositions = await this.db.select()
      .from(schema.marketPositions)
      .where(eq(schema.marketPositions.positioning, positioning))
      .all();

    return Promise.all(
      marketPositions.map(async (position) => {
        const competitor = await this.db.select()
          .from(schema.competitors)
          .where(eq(schema.competitors.id, position.competitorId))
          .get();

        if (!competitor) throw new Error(`Competitor not found for position ${position.id}`);

        const advantages = await this.db.select()
          .from(schema.competitiveAdvantages)
          .where(eq(schema.competitiveAdvantages.competitorId, position.competitorId))
          .all();

        return this.mapToCompetitor(competitor, position, advantages);
      })
    );
  }

  async findCompetitorsWithMarketShareAbove(threshold: MarketShare): Promise<CompetitorEntity[]> {
    const marketPositions = await this.db.select()
      .from(schema.marketPositions)
      .where(gt(schema.marketPositions.marketShare, threshold.toPercentage()))
      .all();

    return Promise.all(
      marketPositions.map(async (position) => {
        const competitor = await this.db.select()
          .from(schema.competitors)
          .where(eq(schema.competitors.id, position.competitorId))
          .get();

        if (!competitor) throw new Error(`Competitor not found for position ${position.id}`);

        const advantages = await this.db.select()
          .from(schema.competitiveAdvantages)
          .where(eq(schema.competitiveAdvantages.competitorId, position.competitorId))
          .all();

        return this.mapToCompetitor(competitor, position, advantages);
      })
    );
  }

  async updateMarketPosition(id: CompetitorId, newPosition: MarketPositionEntity): Promise<void> {
    await this.db.update(schema.marketPositions)
      .set({
        marketShare: newPosition.getMarketShare().toPercentage(),
        positioning: newPosition.getPositioning(),
        lastUpdated: sql`${newPosition.getLastUpdated().toUnixTimestamp()}`,
      })
      .where(eq(schema.marketPositions.competitorId, id.toString()));

    // Update competitive advantages
    await this.db.delete(schema.competitiveAdvantages)
      .where(eq(schema.competitiveAdvantages.competitorId, id.toString()));

    const advantages = newPosition.getCompetitiveAdvantages();
    if (advantages.length > 0) {
      await this.db.insert(schema.competitiveAdvantages).values(
        advantages.map(advantage => ({
          id: crypto.randomUUID(),
          competitorId: id.toString(),
          advantage,
        }))
      );
    }
  }

  async delete(id: CompetitorId): Promise<void> {
    await this.db.transaction(async (tx) => {
      await tx.delete(schema.competitiveAdvantages)
        .where(eq(schema.competitiveAdvantages.competitorId, id.toString()));
      await tx.delete(schema.marketPositions)
        .where(eq(schema.marketPositions.competitorId, id.toString()));
      await tx.delete(schema.competitors)
        .where(eq(schema.competitors.id, id.toString()));
    });
  }

  async exists(id: CompetitorId): Promise<boolean> {
    const result = await this.db.select({ id: schema.competitors.id })
      .from(schema.competitors)
      .where(eq(schema.competitors.id, id.toString()))
      .get();
    return result !== undefined;
  }

  private mapToCompetitor(
    competitor: schema.Competitor,
    marketPosition: schema.MarketPosition | undefined,
    advantages: schema.CompetitiveAdvantage[]
  ): CompetitorEntity {
    if (!marketPosition) {
      throw new Error(`Market position not found for competitor ${competitor.id}`);
    }

    const profile = new CompetitorProfile(
      competitor.industry,
      competitor.size as CompanySize,
      new Date(competitor.founded),
      CompanyDescription.create(competitor.description || '')
    );

    const position = new MarketPositionEntity(
      MarketShare.fromPercentage(marketPosition.marketShare),
      advantages.map(ca => ca.advantage),
      marketPosition.positioning as MarketPositioning,
      LastUpdated.fromUnixTimestamp(Number(marketPosition.lastUpdated))
    );

    return new CompetitorEntity(
      CompetitorId.fromString(competitor.id),
      CompetitorName.create(competitor.name),
      profile,
      position
    );
  }
} 