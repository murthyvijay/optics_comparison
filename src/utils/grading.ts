import type { Grade, TestResultWithCase, CategoryResult } from '../types';

export const GRADE_THRESHOLDS = {
  A: 80,
  B: 70,
  C: 60,
  D: 50,
};

export function calculatePassRate(results: TestResultWithCase[]): number {
  const resultsWithData = results.filter(r => r.result !== null);

  if (resultsWithData.length === 0) {
    return 0;
  }

  const passedCount = resultsWithData.filter(r => r.result?.passed).length;
  return Math.round((passedCount / resultsWithData.length) * 100);
}

export function calculateGrade(passRate: number): Grade {
  if (passRate >= GRADE_THRESHOLDS.A) return 'A';
  if (passRate >= GRADE_THRESHOLDS.B) return 'B';
  if (passRate >= GRADE_THRESHOLDS.C) return 'C';
  if (passRate >= GRADE_THRESHOLDS.D) return 'D';
  return 'F';
}

export function calculateCategoryGrade(categoryResult: CategoryResult): CategoryResult {
  const passRate = calculatePassRate(categoryResult.tests);
  const grade = calculateGrade(passRate);

  return {
    ...categoryResult,
    grade,
    passRate,
  };
}
