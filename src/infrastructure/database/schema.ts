import { sql } from 'drizzle-orm';
import { type InferSelectModel } from 'drizzle-orm';
import { text, real, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { CompanySize } from '../../domain/competitor/CompetitorProfile';
import { MarketPositioning } from '../../domain/competitor/MarketPosition';

const companySizeValues = Object.values(CompanySize) as [string, ...string[]];
const marketPositioningValues = Object.values(MarketPositioning) as [string, ...string[]];

export const competitors = sqliteTable('competitors', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  industry: text('industry').notNull(),
  size: text('size', { enum: companySizeValues }).notNull(),
  founded: text('founded').notNull(), // Will store Date as ISO string
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const competitorsRelations = relations(competitors, ({ one, many }) => ({
  marketPosition: one(marketPositions, {
    fields: [competitors.id],
    references: [marketPositions.competitorId],
  }),
  competitiveAdvantages: many(competitiveAdvantages),
}));

export const marketPositions = sqliteTable('market_positions', {
  id: text('id').primaryKey(),
  competitorId: text('competitor_id')
    .notNull()
    .references(() => competitors.id),
  marketShare: real('market_share').notNull(),
  positioning: text('positioning', { enum: marketPositioningValues }).notNull(),
  lastUpdated: integer('last_updated', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const marketPositionsRelations = relations(marketPositions, ({ one }) => ({
  competitor: one(competitors, {
    fields: [marketPositions.competitorId],
    references: [competitors.id],
  }),
}));

export const competitiveAdvantages = sqliteTable('competitive_advantages', {
  id: text('id').primaryKey(),
  competitorId: text('competitor_id')
    .notNull()
    .references(() => competitors.id),
  advantage: text('advantage').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const competitiveAdvantagesRelations = relations(competitiveAdvantages, ({ one }) => ({
  competitor: one(competitors, {
    fields: [competitiveAdvantages.competitorId],
    references: [competitors.id],
  }),
}));

export type Competitor = InferSelectModel<typeof competitors>;
export type MarketPosition = InferSelectModel<typeof marketPositions>;
export type CompetitiveAdvantage = InferSelectModel<typeof competitiveAdvantages>; 