import { useState, useEffect } from 'react';
import { loadTransceivers, loadTestCategories, loadTestCases, loadTestResults } from '../lib/dataLoader';
import type {
  Transceiver,
  TestCategory,
  TestCase,
  TestResult,
  TransceiverResults,
  CategoryResult,
  TestResultWithCase
} from '../types';
import { calculateCategoryGrade, calculateGrade, calculatePassRate } from '../utils/grading';

export function useTransceiverResults(transceiverId: string | null) {
  const [results, setResults] = useState<TransceiverResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!transceiverId) {
      setResults(null);
      return;
    }

    async function fetchResults() {
      try {
        setLoading(true);
        console.log('Loading results for transceiver:', transceiverId);

        const [allTransceivers, categories, testCases, testResultsRaw] = await Promise.all([
          loadTransceivers(),
          loadTestCategories(),
          loadTestCases(),
          loadTestResults(transceiverId)
        ]);

        console.log('Loaded data:', {
          transceivers: allTransceivers.length,
          categories: categories.length,
          testCases: testCases.length,
          testResults: testResultsRaw.length
        });

        const transceiver = allTransceivers.find(t => t.id === transceiverId);

        if (!transceiver) {
          console.error('Transceiver not found:', transceiverId);
          throw new Error('Transceiver not found');
        }

        console.log('Found transceiver:', transceiver);

        const sortedCategories = [...categories].sort((a, b) => a.display_order - b.display_order);
        const sortedTestCases = [...testCases].sort((a, b) => {
          if (a.category_id === b.category_id) {
            return a.display_order - b.display_order;
          }
          return a.category_id.localeCompare(b.category_id);
        });

        const testResults: TestResult[] = testResultsRaw.map(r => ({
          id: `result-${transceiverId}-${r.test_case_id}`,
          transceiver_id: transceiverId,
          test_case_id: r.test_case_id,
          passed: r.passed,
          value: r.value,
          notes: r.notes,
          tested_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        }));

        const categoryResults: CategoryResult[] = sortedCategories.map(category => {
          const categoryTests = sortedTestCases.filter(tc => tc.category_id === category.id);
          const tests: TestResultWithCase[] = categoryTests.map(testCase => {
            const result = testResults.find(tr => tr.test_case_id === testCase.id) || null;
            return { testCase, result };
          });

          return calculateCategoryGrade({
            category,
            tests,
            grade: 'F',
            passRate: 0
          });
        });

        const allTests = categoryResults.flatMap(cr => cr.tests);
        const overallPassRate = calculatePassRate(allTests);
        const overallGrade = calculateGrade(overallPassRate);

        const finalResults = {
          transceiver,
          categoryResults,
          overallGrade,
          overallPassRate
        };

        console.log('Setting results:', finalResults);
        setResults(finalResults);
        setError(null);
      } catch (err) {
        console.error('Error loading transceiver results:', err);
        setError(err as Error);
        setResults(null);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [transceiverId]);

  return { results, loading, error };
}
