import { describe, expect, it } from 'bun:test';
import { CompanyDescription } from '../../competitor/value-objects/CompanyDescription';

describe('CompanyDescription', () => {
  describe('create', () => {
    it('should create from valid description', () => {
      const description = 'A leading technology company';
      const companyDescription = CompanyDescription.create(description);
      expect(companyDescription.toString()).toBe(description);
    });

    it('should trim whitespace', () => {
      const description = '  A leading technology company  ';
      const companyDescription = CompanyDescription.create(description);
      expect(companyDescription.toString()).toBe('A leading technology company');
    });

    it('should throw error for empty description', () => {
      expect(() => CompanyDescription.create('')).toThrow('Company description cannot be empty');
      expect(() => CompanyDescription.create('   ')).toThrow('Company description cannot be empty');
    });

    it('should throw error for description exceeding max length', () => {
      const longDescription = 'A'.repeat(2001);
      expect(() => CompanyDescription.create(longDescription))
        .toThrow('Company description cannot be longer than 2000 characters');
    });

    it('should accept description at max length', () => {
      const maxDescription = 'A'.repeat(2000);
      const companyDescription = CompanyDescription.create(maxDescription);
      expect(companyDescription.toString()).toBe(maxDescription);
    });
  });

  describe('equals', () => {
    it('should return true for same description', () => {
      const desc1 = CompanyDescription.create('A leading technology company');
      const desc2 = CompanyDescription.create('A leading technology company');
      expect(desc1.equals(desc2)).toBe(true);
    });

    it('should return false for different descriptions', () => {
      const desc1 = CompanyDescription.create('A leading technology company');
      const desc2 = CompanyDescription.create('A software development company');
      expect(desc1.equals(desc2)).toBe(false);
    });

    it('should consider trimmed descriptions equal', () => {
      const desc1 = CompanyDescription.create('A leading technology company');
      const desc2 = CompanyDescription.create('  A leading technology company  ');
      expect(desc1.equals(desc2)).toBe(true);
    });
  });

  describe('toString', () => {
    it('should return the string representation', () => {
      const descStr = 'A leading technology company';
      const description = CompanyDescription.create(descStr);
      expect(description.toString()).toBe(descStr);
    });
  });
}); 