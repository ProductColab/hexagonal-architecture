import { describe, expect, it } from 'bun:test';
import { LastUpdated } from '../../competitor/value-objects/LastUpdated';

describe('LastUpdated', () => {
  describe('fromUnixTimestamp', () => {
    it('should create from seconds timestamp', () => {
      const timestamp = 1647619200; // March 18, 2022 12:00:00 PM UTC
      const lastUpdated = LastUpdated.fromUnixTimestamp(timestamp);
      expect(lastUpdated.toUnixTimestamp()).toBe(timestamp);
    });

    it('should create from milliseconds timestamp', () => {
      const timestampMs = 1647619200000; // March 18, 2022 12:00:00 PM UTC
      const lastUpdated = LastUpdated.fromUnixTimestamp(timestampMs);
      expect(lastUpdated.toUnixTimestamp()).toBe(1647619200);
    });
  });

  describe('fromDate', () => {
    it('should create from Date object', () => {
      const date = new Date('2022-03-18T12:00:00Z');
      const lastUpdated = LastUpdated.fromDate(date);
      expect(lastUpdated.toDate()).toEqual(date);
    });
  });

  describe('now', () => {
    it('should create with current time', () => {
      const before = new Date();
      const lastUpdated = LastUpdated.now();
      const after = new Date();

      const timestamp = lastUpdated.toDate().getTime();
      expect(timestamp).toBeGreaterThanOrEqual(before.getTime());
      expect(timestamp).toBeLessThanOrEqual(after.getTime());
    });
  });

  describe('equals', () => {
    it('should return true for same timestamp', () => {
      const date = new Date('2022-03-18T12:00:00Z');
      const lastUpdated1 = LastUpdated.fromDate(date);
      const lastUpdated2 = LastUpdated.fromDate(date);
      expect(lastUpdated1.equals(lastUpdated2)).toBe(true);
    });

    it('should return false for different timestamps', () => {
      const date1 = new Date('2022-03-18T12:00:00Z');
      const date2 = new Date('2022-03-18T12:00:01Z');
      const lastUpdated1 = LastUpdated.fromDate(date1);
      const lastUpdated2 = LastUpdated.fromDate(date2);
      expect(lastUpdated1.equals(lastUpdated2)).toBe(false);
    });
  });

  describe('isWithinSeconds', () => {
    it('should return true when within specified seconds', () => {
      const now = new Date();
      const fiveSecondsAgo = new Date(now.getTime() - 5000);
      const lastUpdated = LastUpdated.fromDate(fiveSecondsAgo);
      expect(lastUpdated.isWithinSeconds(10)).toBe(true);
    });

    it('should return false when outside specified seconds', () => {
      const now = new Date();
      const tenSecondsAgo = new Date(now.getTime() - 10000);
      const lastUpdated = LastUpdated.fromDate(tenSecondsAgo);
      expect(lastUpdated.isWithinSeconds(5)).toBe(false);
    });

    it('should compare against provided reference date', () => {
      const referenceDate = new Date('2022-03-18T12:00:00Z');
      const fiveSecondsLater = new Date('2022-03-18T12:00:05Z');
      const lastUpdated = LastUpdated.fromDate(fiveSecondsLater);
      expect(lastUpdated.isWithinSeconds(10, referenceDate)).toBe(true);
      expect(lastUpdated.isWithinSeconds(3, referenceDate)).toBe(false);
    });

    it('should compare against provided LastUpdated reference', () => {
      const referenceDate = new Date('2022-03-18T12:00:00Z');
      const reference = LastUpdated.fromDate(referenceDate);
      const fiveSecondsLater = new Date('2022-03-18T12:00:05Z');
      const lastUpdated = LastUpdated.fromDate(fiveSecondsLater);
      expect(lastUpdated.isWithinSeconds(10, reference)).toBe(true);
      expect(lastUpdated.isWithinSeconds(3, reference)).toBe(false);
    });
  });
}); 