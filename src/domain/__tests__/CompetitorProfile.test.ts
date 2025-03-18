import { describe, expect, it } from 'bun:test';
import { CompetitorProfile } from '../competitor/CompetitorProfile';
import { CompanyDescription } from '../competitor/value-objects/CompanyDescription';
import { CompanySize } from '../competitor/CompetitorProfile';

describe('CompetitorProfile', () => {
  const validIndustry = 'Technology';
  const validSize = CompanySize.ENTERPRISE;
  const validFounded = new Date('2000-01-01');
  const validDescription = CompanyDescription.create('A leading technology company');

  describe('constructor', () => {
    it('should create with valid parameters', () => {
      const profile = new CompetitorProfile(
        validIndustry,
        validSize,
        validFounded,
        validDescription
      );

      expect(profile.getIndustry()).toBe(validIndustry);
      expect(profile.getSize()).toBe(validSize);
      expect(profile.getFounded()).toEqual(validFounded);
      expect(profile.getDescription()).toBe(validDescription);
    });
  });

  describe('getters', () => {
    const profile = new CompetitorProfile(
      validIndustry,
      validSize,
      validFounded,
      validDescription
    );

    it('should return correct industry', () => {
      expect(profile.getIndustry()).toBe(validIndustry);
    });

    it('should return correct size', () => {
      expect(profile.getSize()).toBe(validSize);
    });

    it('should return correct founded date', () => {
      expect(profile.getFounded()).toEqual(validFounded);
    });

    it('should return correct description', () => {
      expect(profile.getDescription()).toBe(validDescription);
    });
  });

  describe('immutability', () => {
    const profile = new CompetitorProfile(
      validIndustry,
      validSize,
      validFounded,
      validDescription
    );

    it('should not allow modifying founded date through getter', () => {
      const originalDate = profile.getFounded();
      const modifiedDate = profile.getFounded();
      modifiedDate.setFullYear(2001);

      expect(profile.getFounded().getTime()).toBe(validFounded.getTime());
      expect(originalDate.getTime()).toBe(validFounded.getTime());
      expect(modifiedDate.getTime()).not.toBe(validFounded.getTime());
    });
  });
}); 