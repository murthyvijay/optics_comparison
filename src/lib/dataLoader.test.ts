import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadTransceivers, loadTestCategories, loadTestCases, loadTestResults } from './dataLoader';

describe('dataLoader', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  describe('loadTransceivers', () => {
    it('should load transceivers from JSON file', async () => {
      const mockData = [
        { id: '1', name: 'Transceiver 1', manufacturer: 'Cisco', type: '100G' }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await loadTransceivers();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('/data/transceivers.json');
    });

    it('should throw error if fetch fails', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await expect(loadTransceivers()).rejects.toThrow('Failed to load transceivers');
    });
  });

  describe('loadTestCategories', () => {
    it('should load test categories from JSON file', async () => {
      const mockData = [
        { id: 'cat1', name: 'Signal Integrity', description: 'Test description', display_order: 0 }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await loadTestCategories();
      expect(result).toEqual(mockData);
    });
  });

  describe('loadTestCases', () => {
    it('should load test cases from JSON file', async () => {
      const mockData = [
        { id: 'tc1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: 'Pass', display_order: 0 }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await loadTestCases();
      expect(result).toEqual(mockData);
    });
  });

  describe('loadTestResults', () => {
    it('should load test results for a transceiver', async () => {
      const mockData = [
        { test_case_id: 'tc1', passed: true, value: '100', notes: 'Good' }
      ];

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData
      });

      const result = await loadTestResults('trans-1');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('/data/test-results-trans-1.json');
    });

    it('should return empty array if file not found', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      const result = await loadTestResults('trans-999');
      expect(result).toEqual([]);
    });
  });
});
