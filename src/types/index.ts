export interface Transceiver {
  id: string;
  name: string;
  manufacturer: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

export interface TestCategory {
  id: string;
  name: string;
  description: string;
  display_order: number;
  created_at?: string;
}

export interface TestCase {
  id: string;
  category_id: string;
  name: string;
  description: string;
  pass_criteria: string;
  display_order: number;
  created_at?: string;
}

export interface TestResult {
  id: string;
  transceiver_id: string;
  test_case_id: string;
  passed: boolean;
  value: string;
  notes: string;
  tested_at: string;
  created_at: string;
}

export interface CategoryWithTests {
  category: TestCategory;
  tests: TestCase[];
}

export interface TransceiverResults {
  transceiver: Transceiver;
  categoryResults: CategoryResult[];
  overallGrade: Grade;
  overallPassRate: number;
}

export interface CategoryResult {
  category: TestCategory;
  tests: TestResultWithCase[];
  grade: Grade;
  passRate: number;
}

export interface TestResultWithCase {
  testCase: TestCase;
  result: TestResult | null;
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface GradeThresholds {
  A: number;
  B: number;
  C: number;
  D: number;
}
