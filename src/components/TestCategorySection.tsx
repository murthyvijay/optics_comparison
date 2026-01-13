import { useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import type { CategoryResult } from '../types';

interface TestCategorySectionProps {
  categoryResult: CategoryResult;
}

const gradeColors = {
  A: 'bg-green-500',
  B: 'bg-blue-500',
  C: 'bg-yellow-500',
  D: 'bg-orange-500',
  F: 'bg-red-500',
};

export function TestCategorySection({ categoryResult }: TestCategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { category, tests, grade, passRate } = categoryResult;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          )}
          <h4 className="font-semibold text-gray-800">{category.name}</h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{passRate}%</span>
          <div className={`${gradeColors[grade]} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
            {grade}
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 space-y-3">
          {tests.map(({ testCase, result }) => (
            <div
              key={testCase.id}
              className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {result ? (
                    result.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                  )}
                  <h5 className="font-medium text-gray-800">{testCase.name}</h5>
                </div>
                <p className="text-sm text-gray-600 ml-7">{testCase.description}</p>
                <p className="text-xs text-gray-500 ml-7 mt-1">
                  Criteria: {testCase.pass_criteria}
                </p>
                {result && result.value && (
                  <p className="text-sm font-medium text-gray-700 ml-7 mt-1">
                    Result: {result.value}
                  </p>
                )}
                {result && result.notes && (
                  <p className="text-xs text-gray-500 ml-7 mt-1">
                    Note: {result.notes}
                  </p>
                )}
              </div>
              {result && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    result.passed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {result.passed ? 'PASS' : 'FAIL'}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
