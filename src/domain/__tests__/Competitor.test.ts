import { describe, expect, it } from 'bun:test';
import { Competitor } from '../competitor/Competitor';
import { CompetitorId } from '../competitor/value-objects/CompetitorId';
import { CompetitorName } from '../competitor/value-objects/CompetitorName';
import { CompetitorProfile } from '../competitor/CompetitorProfile';
import { MarketPosition, MarketPositioning } from '../competitor/MarketPosition';
import { CompanyDescription } from '../competitor/value-objects/CompanyDescription';
import { MarketShare } from '../competitor/value-objects/MarketShare';
import { LastUpdated } from '../competitor/value-objects/LastUpdated';
import { CompanySize } from '../competitor/CompetitorProfile';

describe('Competitor', () => {
  // Test fixtures
  const validId = CompetitorId.create();
  const validName = CompetitorName.create('Acme Corp');
  const validProfile = new CompetitorProfile(
    'Technology',
    CompanySize.ENTERPRISE,
    new Date('2000-01-01'),
    CompanyDescription.create('A leading tech company')
  );
  const validMarketPosition = new MarketPosition(
    MarketShare.fromPercentage(25),
    ['Strong Brand', 'Innovation'],
    MarketPositioning.LEADER,
    LastUpdated.now()
  );

  describe('constructor', () => {
    it('should create with valid parameters', () => {
      const competitor = new Competitor(
        validId,
        validName,
        validProfile,
        validMarketPosition
      );

      expect(competitor.getId()).toBe(validId);
      expect(competitor.getName()).toBe(validName);
      expect(competitor.getProfile()).toBe(validProfile);
      expect(competitor.getMarketPosition()).toBe(validMarketPosition);
    });
  });

  describe('getters', () => {
    const competitor = new Competitor(
      validId,
      validName,
      validProfile,
      validMarketPosition
    );

    it('should return correct ID', () => {
      expect(competitor.getId()).toBe(validId);
    });

    it('should return correct name', () => {
      expect(competitor.getName()).toBe(validName);
    });

    it('should return correct profile', () => {
      expect(competitor.getProfile()).toBe(validProfile);
    });

    it('should return correct market position', () => {
      expect(competitor.getMarketPosition()).toBe(validMarketPosition);
    });
  });

  describe('updateMarketPosition', () => {
    it('should update market position', () => {
      const competitor = new Competitor(
        validId,
        validName,
        validProfile,
        validMarketPosition
      );

      const newMarketPosition = new MarketPosition(
        MarketShare.fromPercentage(30),
        ['Strong Brand', 'Innovation', 'Market Reach'],
        MarketPositioning.CHALLENGER,
        LastUpdated.now()
      );

      competitor.updateMarketPosition(newMarketPosition);
      expect(competitor.getMarketPosition()).toBe(newMarketPosition);
      expect(competitor.getMarketPosition()).not.toBe(validMarketPosition);
    });
  });

  describe('equals', () => {
    it('should return true for same ID', () => {
      const competitor1 = new Competitor(
        validId,
        validName,
        validProfile,
        validMarketPosition
      );

      const competitor2 = new Competitor(
        validId,
        CompetitorName.create('Different Name'), // Different name but same ID
        validProfile,
        validMarketPosition
      );

      expect(competitor1.equals(competitor2)).toBe(true);
    });

    it('should return false for different IDs', () => {
      const competitor1 = new Competitor(
        validId,
        validName,
        validProfile,
        validMarketPosition
      );

      const competitor2 = new Competitor(
        CompetitorId.create(), // Different ID
        validName,
        validProfile,
        validMarketPosition
      );

      expect(competitor1.equals(competitor2)).toBe(false);
    });

    it('should return false for non-Competitor objects', () => {
      const competitor = new Competitor(
        validId,
        validName,
        validProfile,
        validMarketPosition
      );

      const nonCompetitor = {};
      expect(competitor.equals(nonCompetitor as any)).toBe(false);
    });
  });
}); 