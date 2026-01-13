import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransceiverCard } from './TransceiverCard';
import type { TransceiverResults } from '../types';

describe('TransceiverCard', () => {
  const mockResults: TransceiverResults = {
    transceiver: {
      id: '1',
      name: 'QSFP28-100G-SR4',
      manufacturer: 'Cisco',
      type: '100G QSFP28',
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    categoryResults: [
      {
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
          }
        ],
        grade: 'A',
        passRate: 100
      }
    ],
    overallGrade: 'A',
    overallPassRate: 100
  };

  it('should render transceiver name', () => {
    render(<TransceiverCard results={mockResults} />);
    expect(screen.getByText('QSFP28-100G-SR4')).toBeInTheDocument();
  });

  it('should render manufacturer', () => {
    render(<TransceiverCard results={mockResults} />);
    expect(screen.getByText('Cisco')).toBeInTheDocument();
  });

  it('should render transceiver type', () => {
    render(<TransceiverCard results={mockResults} />);
    expect(screen.getByText('100G QSFP28')).toBeInTheDocument();
  });

  it('should render overall grade', () => {
    render(<TransceiverCard results={mockResults} />);
    const gradeElements = screen.getAllByText('A');
    expect(gradeElements.length).toBeGreaterThan(0);
  });

  it('should render overall pass rate', () => {
    render(<TransceiverCard results={mockResults} />);
    const passRateElements = screen.getAllByText('100%');
    expect(passRateElements.length).toBeGreaterThan(0);
  });

  it('should render loading state when results are null', () => {
    render(<TransceiverCard results={null} />);
    expect(screen.getByText(/select a transceiver/i)).toBeInTheDocument();
  });
});
