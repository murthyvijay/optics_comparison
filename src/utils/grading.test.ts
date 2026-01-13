import { describe, it, expect } from 'vitest';
import { calculateGrade, calculatePassRate, calculateCategoryGrade } from './grading';
import type { TestResultWithCase, CategoryResult } from '../types';

describe('grading utilities', () => {
  describe('calculatePassRate', () => {
    it('should return 100 for all passed tests', () => {
      const results: TestResultWithCase[] = [
        {
          testCase: { id: '1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: '', display_order: 0, created_at: '' },
          result: { id: 'r1', transceiver_id: 't1', test_case_id: '1', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
        },
        {
          testCase: { id: '2', category_id: 'cat1', name: 'Test 2', description: '', pass_criteria: '', display_order: 1, created_at: '' },
          result: { id: 'r2', transceiver_id: 't1', test_case_id: '2', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
        }
      ];

      expect(calculatePassRate(results)).toBe(100);
    });

    it('should return 0 for all failed tests', () => {
      const results: TestResultWithCase[] = [
        {
          testCase: { id: '1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: '', display_order: 0, created_at: '' },
          result: { id: 'r1', transceiver_id: 't1', test_case_id: '1', passed: false, value: '', notes: '', tested_at: '', created_at: '' }
        },
        {
          testCase: { id: '2', category_id: 'cat1', name: 'Test 2', description: '', pass_criteria: '', display_order: 1, created_at: '' },
          result: { id: 'r2', transceiver_id: 't1', test_case_id: '2', passed: false, value: '', notes: '', tested_at: '', created_at: '' }
        }
      ];

      expect(calculatePassRate(results)).toBe(0);
    });

    it('should return 50 for half passed tests', () => {
      const results: TestResultWithCase[] = [
        {
          testCase: { id: '1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: '', display_order: 0, created_at: '' },
          result: { id: 'r1', transceiver_id: 't1', test_case_id: '1', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
        },
        {
          testCase: { id: '2', category_id: 'cat1', name: 'Test 2', description: '', pass_criteria: '', display_order: 1, created_at: '' },
          result: { id: 'r2', transceiver_id: 't1', test_case_id: '2', passed: false, value: '', notes: '', tested_at: '', created_at: '' }
        }
      ];

      expect(calculatePassRate(results)).toBe(50);
    });

    it('should return 0 for empty results', () => {
      expect(calculatePassRate([])).toBe(0);
    });

    it('should ignore tests without results', () => {
      const results: TestResultWithCase[] = [
        {
          testCase: { id: '1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: '', display_order: 0, created_at: '' },
          result: { id: 'r1', transceiver_id: 't1', test_case_id: '1', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
        },
        {
          testCase: { id: '2', category_id: 'cat1', name: 'Test 2', description: '', pass_criteria: '', display_order: 1, created_at: '' },
          result: null
        }
      ];

      expect(calculatePassRate(results)).toBe(100);
    });
  });

  describe('calculateGrade', () => {
    it('should return A for pass rate >= 80', () => {
      expect(calculateGrade(100)).toBe('A');
      expect(calculateGrade(90)).toBe('A');
      expect(calculateGrade(80)).toBe('A');
    });

    it('should return B for pass rate >= 70', () => {
      expect(calculateGrade(79)).toBe('B');
      expect(calculateGrade(75)).toBe('B');
      expect(calculateGrade(70)).toBe('B');
    });

    it('should return C for pass rate >= 60', () => {
      expect(calculateGrade(69)).toBe('C');
      expect(calculateGrade(65)).toBe('C');
      expect(calculateGrade(60)).toBe('C');
    });

    it('should return D for pass rate >= 50', () => {
      expect(calculateGrade(59)).toBe('D');
      expect(calculateGrade(55)).toBe('D');
      expect(calculateGrade(50)).toBe('D');
    });

    it('should return F for pass rate < 50', () => {
      expect(calculateGrade(49)).toBe('F');
      expect(calculateGrade(25)).toBe('F');
      expect(calculateGrade(0)).toBe('F');
    });
  });

  describe('calculateCategoryGrade', () => {
    it('should calculate grade for a category with all tests passed', () => {
      const categoryResult: CategoryResult = {
        category: { id: 'cat1', name: 'Signal Integrity', description: '', display_order: 0, created_at: '' },
        tests: [
          {
            testCase: { id: '1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: '', display_order: 0, created_at: '' },
            result: { id: 'r1', transceiver_id: 't1', test_case_id: '1', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
          },
          {
            testCase: { id: '2', category_id: 'cat1', name: 'Test 2', description: '', pass_criteria: '', display_order: 1, created_at: '' },
            result: { id: 'r2', transceiver_id: 't1', test_case_id: '2', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
          }
        ],
        grade: 'F',
        passRate: 0
      };

      const result = calculateCategoryGrade(categoryResult);
      expect(result.grade).toBe('A');
      expect(result.passRate).toBe(100);
    });

    it('should calculate grade for a category with mixed results', () => {
      const categoryResult: CategoryResult = {
        category: { id: 'cat1', name: 'Signal Integrity', description: '', display_order: 0, created_at: '' },
        tests: [
          {
            testCase: { id: '1', category_id: 'cat1', name: 'Test 1', description: '', pass_criteria: '', display_order: 0, created_at: '' },
            result: { id: 'r1', transceiver_id: 't1', test_case_id: '1', passed: true, value: '', notes: '', tested_at: '', created_at: '' }
          },
          {
            testCase: { id: '2', category_id: 'cat1', name: 'Test 2', description: '', pass_criteria: '', display_order: 1, created_at: '' },
            result: { id: 'r2', transceiver_id: 't1', test_case_id: '2', passed: false, value: '', notes: '', tested_at: '', created_at: '' }
          }
        ],
        grade: 'F',
        passRate: 0
      };

      const result = calculateCategoryGrade(categoryResult);
      expect(result.grade).toBe('D');
      expect(result.passRate).toBe(50);
    });
  });
});
