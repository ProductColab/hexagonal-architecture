import { describe, expect, it } from 'bun:test';
import { CompetitorName } from '../../competitor/value-objects/CompetitorName';

describe('CompetitorName', () => {
  describe('create', () => {
    it('should create from valid name', () => {
      const name = 'Acme Corporation';
      const competitorName = CompetitorName.create(name);
      expect(competitorName.toString()).toBe(name);
    });

    it('should trim whitespace', () => {
      const competitorName = CompetitorName.create('  Acme Corporation  ');
      expect(competitorName.toString()).toBe('Acme Corporation');
    });

    it('should throw error for empty name', () => {
      expect(() => CompetitorName.create('')).toThrow('Competitor name cannot be empty');
      expect(() => CompetitorName.create('   ')).toThrow('Competitor name cannot be empty');
    });

    it('should throw error for name exceeding max length', () => {
      const longName = 'A'.repeat(101);
      expect(() => CompetitorName.create(longName))
        .toThrow('Competitor name cannot be longer than 100 characters');
    });
  });

  describe('equals', () => {
    it('should return true for same name', () => {
      const name1 = CompetitorName.create('Acme Corporation');
      const name2 = CompetitorName.create('Acme Corporation');
      expect(name1.equals(name2)).toBe(true);
    });

    it('should return false for different names', () => {
      const name1 = CompetitorName.create('Acme Corporation');
      const name2 = CompetitorName.create('Other Company');
      expect(name1.equals(name2)).toBe(false);
    });

    it('should consider trimmed names equal', () => {
      const name1 = CompetitorName.create('Acme Corporation');
      const name2 = CompetitorName.create('  Acme Corporation  ');
      expect(name1.equals(name2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('should return the string representation', () => {
      const nameStr = 'Acme Corporation';
      const name = CompetitorName.create(nameStr);
      expect(name.toString()).toBe(nameStr);
    });
  });
}); 