import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportToCSV, formatResultsForExport } from './export';
import type { TransceiverResults } from '../types';

describe('export utilities', () => {
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

  describe('formatResultsForExport', () => {
    it('should format single transceiver results correctly', () => {
      const formatted = formatResultsForExport([mockResults]);

      expect(formatted).toContain('QSFP28-100G-SR4');
      expect(formatted).toContain('Cisco');
      expect(formatted).toContain('Signal Integrity');
      expect(formatted).toContain('Eye Diagram');
      expect(formatted).toContain('PASS');
      expect(formatted).toContain('120mV');
    });

    it('should include headers in export', () => {
      const formatted = formatResultsForExport([mockResults]);

      expect(formatted).toContain('Transceiver,Manufacturer,Type,Category,Test,Status,Value,Grade,Pass Rate');
    });

    it('should format multiple transceivers', () => {
      const mockResults2 = {
        ...mockResults,
        transceiver: {
          ...mockResults.transceiver,
          id: '2',
          name: 'QSFP-DD-400G',
          manufacturer: 'Arista'
        }
      };

      const formatted = formatResultsForExport([mockResults, mockResults2]);

      expect(formatted).toContain('QSFP28-100G-SR4');
      expect(formatted).toContain('QSFP-DD-400G');
      expect(formatted).toContain('Arista');
    });
  });

  describe('exportToCSV', () => {
    beforeEach(() => {
      global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
      global.URL.revokeObjectURL = vi.fn();

      const mockLink = {
        click: vi.fn(),
        setAttribute: vi.fn(),
        style: {},
      };

      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockLink as any);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockLink as any);
    });

    it('should trigger download with correct filename', () => {
      exportToCSV([mockResults]);

      expect(document.createElement).toHaveBeenCalledWith('a');
      const link = document.createElement('a');
      expect(link.setAttribute).toHaveBeenCalled();
    });

    it('should create blob with CSV data', () => {
      const blobSpy = vi.spyOn(global, 'Blob');

      exportToCSV([mockResults]);

      expect(blobSpy).toHaveBeenCalled();
    });
  });
});
