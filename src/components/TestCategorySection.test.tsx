import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TestCategorySection } from './TestCategorySection';
import type { CategoryResult } from '../types';

describe('TestCategorySection', () => {
  const mockCategoryResult: CategoryResult = {
    category: {
      id: 'cat1',
      name: 'Signal Integrity',
      description: 'Tests for signal quality',
      display_order: 0,
      created_at: '2024-01-01'
    },
    tests: [
      {
        testCase: {
          id: 'tc1',
          category_id: 'cat1',
          name: 'Eye Diagram',
          description: 'Measures eye opening',
          pass_criteria: 'Eye height > 100mV',
          display_order: 0,
          created_at: '2024-01-01'
        },
        result: {
          id: 'r1',
          transceiver_id: '1',
          test_case_id: 'tc1',
          passed: true,
          value: '120mV',
          notes: '',
          tested_at: '2024-01-01',
          created_at: '2024-01-01'
        }
      },
      {
        testCase: {
          id: 'tc2',
          category_id: 'cat1',
          name: 'Jitter',
          description: 'Measures signal jitter',
          pass_criteria: 'Jitter < 50ps',
          display_order: 1,
          created_at: '2024-01-01'
        },
        result: {
          id: 'r2',
          transceiver_id: '1',
          test_case_id: 'tc2',
          passed: false,
          value: '60ps',
          notes: 'Slightly above threshold',
          tested_at: '2024-01-01',
          created_at: '2024-01-01'
        }
      }
    ],
    grade: 'D',
    passRate: 50
  };

  it('should render category name', () => {
    render(<TestCategorySection categoryResult={mockCategoryResult} />);
    expect(screen.getByText('Signal Integrity')).toBeInTheDocument();
  });

  it('should render category grade', () => {
    render(<TestCategorySection categoryResult={mockCategoryResult} />);
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('should render pass rate', () => {
    render(<TestCategorySection categoryResult={mockCategoryResult} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('should toggle expand/collapse on click', () => {
    render(<TestCategorySection categoryResult={mockCategoryResult} />);

    expect(screen.queryByText('Eye Diagram')).not.toBeInTheDocument();

    const header = screen.getByText('Signal Integrity').closest('button');
    if (header) {
      fireEvent.click(header);
    }

    expect(screen.getByText('Eye Diagram')).toBeInTheDocument();
    expect(screen.getByText('Jitter')).toBeInTheDocument();
  });

  it('should display test results when expanded', () => {
    render(<TestCategorySection categoryResult={mockCategoryResult} />);

    const header = screen.getByText('Signal Integrity').closest('button');
    if (header) {
      fireEvent.click(header);
    }

    expect(screen.getByText(/Result: 120mV/)).toBeInTheDocument();
    expect(screen.getByText(/Result: 60ps/)).toBeInTheDocument();
  });
});
