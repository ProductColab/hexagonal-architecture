import { describe, expect, it } from 'bun:test';
import { MarketPosition, MarketPositioning } from '../competitor/MarketPosition';
import { MarketShare } from '../competitor/value-objects/MarketShare';
import { LastUpdated } from '../competitor/value-objects/LastUpdated';

describe('MarketPosition', () => {
  const validMarketShare = MarketShare.fromPercentage(25);
  const validAdvantages = ['Strong Brand', 'Innovative Technology'];
  const validPositioning = MarketPositioning.LEADER;
  const validLastUpdated = LastUpdated.now();

  describe('constructor', () => {
    it('should create with valid parameters', () => {
      const position = new MarketPosition(
        validMarketShare,
        validAdvantages,
        validPositioning,
        validLastUpdated
      );

      expect(position.getMarketShare()).toBe(validMarketShare);
      expect(position.getCompetitiveAdvantages()).toEqual(validAdvantages);
      expect(position.getPositioning()).toBe(validPositioning);
      expect(position.getLastUpdated()).toBe(validLastUpdated);
    });
  });

  describe('getters', () => {
    const position = new MarketPosition(
      validMarketShare,
      validAdvantages,
      validPositioning,
      validLastUpdated
    );

    it('should return correct market share', () => {
      expect(position.getMarketShare()).toBe(validMarketShare);
    });

    it('should return correct competitive advantages', () => {
      expect(position.getCompetitiveAdvantages()).toEqual(validAdvantages);
    });

    it('should return correct positioning', () => {
      expect(position.getPositioning()).toBe(validPositioning);
    });

    it('should return correct last updated timestamp', () => {
      expect(position.getLastUpdated()).toBe(validLastUpdated);
    });
  });

  describe('immutability', () => {
    const position = new MarketPosition(
      validMarketShare,
      validAdvantages,
      validPositioning,
      validLastUpdated
    );

    it('should return a copy of competitive advantages array', () => {
      const advantages = position.getCompetitiveAdvantages();
      advantages.push('New Advantage');
      expect(position.getCompetitiveAdvantages()).toEqual(validAdvantages);
      expect(advantages).not.toEqual(validAdvantages);
    });
  });

  describe('market positioning enum', () => {
    it('should have all expected positions', () => {
      expect(Object.values(MarketPositioning)).toContain(MarketPositioning.LEADER);
      expect(Object.values(MarketPositioning)).toContain(MarketPositioning.CHALLENGER);
      expect(Object.values(MarketPositioning)).toContain(MarketPositioning.FOLLOWER);
      expect(Object.values(MarketPositioning)).toContain(MarketPositioning.NICHE);
    });
  });
}); 