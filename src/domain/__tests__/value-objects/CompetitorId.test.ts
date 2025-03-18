import { describe, expect, it } from 'bun:test';
import { CompetitorId } from '../../competitor/value-objects/CompetitorId';

describe('CompetitorId', () => {
  describe('create', () => {
    it('should create a new unique ID', () => {
      const id1 = CompetitorId.create();
      const id2 = CompetitorId.create();

      expect(id1.toString()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
      expect(id1.toString()).not.toBe(id2.toString());
    });
  });

  describe('fromString', () => {
    it('should create from valid UUID string', () => {
      const validUuid = '123e4567-e89b-12d3-a456-426614174000';
      const id = CompetitorId.fromString(validUuid);
      expect(id.toString()).toBe(validUuid);
    });

    it('should throw error for empty string', () => {
      expect(() => CompetitorId.fromString('')).toThrow('Competitor ID cannot be empty');
    });
  });

  describe('equals', () => {
    it('should return true for same ID', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const id1 = CompetitorId.fromString(uuid);
      const id2 = CompetitorId.fromString(uuid);
      expect(id1.equals(id2)).toBe(true);
    });

    it('should return false for different IDs', () => {
      const id1 = CompetitorId.fromString('123e4567-e89b-12d3-a456-426614174000');
      const id2 = CompetitorId.fromString('987fcdeb-51a2-43fe-ba98-765432198765');
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the string representation', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const id = CompetitorId.fromString(uuid);
      expect(id.toString()).toBe(uuid);
    });
  });
}); 