import { describe, expect, it } from 'bun:test';
import { MarketShare } from '../../competitor/value-objects/MarketShare';

describe('MarketShare', () => {
  describe('fromPercentage', () => {
    it('should create from valid percentage', () => {
      const share = MarketShare.fromPercentage(25.5);
      expect(share.toPercentage()).toBe(25.5);
    });

    it('should accept zero percentage', () => {
      const share = MarketShare.fromPercentage(0);
      expect(share.toPercentage()).toBe(0);
    });

    it('should accept 100 percentage', () => {
      const share = MarketShare.fromPercentage(100);
      expect(share.toPercentage()).toBe(100);
    });

    it('should throw error for negative percentage', () => {
      expect(() => MarketShare.fromPercentage(-1))
        .toThrow('Market share must be between 0 and 100 percent');
    });

    it('should throw error for percentage over 100', () => {
      expect(() => MarketShare.fromPercentage(100.1))
        .toThrow('Market share must be between 0 and 100 percent');
    });
  });

  describe('equals', () => {
    it('should return true for same percentage', () => {
      const share1 = MarketShare.fromPercentage(25.5);
      const share2 = MarketShare.fromPercentage(25.5);
      expect(share1.equals(share2)).toBe(true);
    });

    it('should return false for different percentages', () => {
      const share1 = MarketShare.fromPercentage(25.5);
      const share2 = MarketShare.fromPercentage(25.6);
      expect(share1.equals(share2)).toBe(false);
    });
  });

  describe('comparison', () => {
    it('should correctly compare greater than', () => {
      const share1 = MarketShare.fromPercentage(30);
      const share2 = MarketShare.fromPercentage(20);
      expect(share1.isGreaterThan(share2)).toBe(true);
      expect(share2.isGreaterThan(share1)).toBe(false);
    });

    it('should correctly compare less than', () => {
      const share1 = MarketShare.fromPercentage(20);
      const share2 = MarketShare.fromPercentage(30);
      expect(share1.isLessThan(share2)).toBe(true);
      expect(share2.isLessThan(share1)).toBe(false);
    });

    it('should handle equal values in comparisons', () => {
      const share1 = MarketShare.fromPercentage(25);
      const share2 = MarketShare.fromPercentage(25);
      expect(share1.isGreaterThan(share2)).toBe(false);
      expect(share1.isLessThan(share2)).toBe(false);
    });
  });
}); 