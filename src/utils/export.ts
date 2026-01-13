import type { TransceiverResults } from '../types';

export function formatResultsForExport(results: TransceiverResults[]): string {
  const lines: string[] = [];

  lines.push('Transceiver,Manufacturer,Type,Category,Test,Status,Value,Grade,Pass Rate');

  for (const result of results) {
    const { transceiver, categoryResults, overallGrade, overallPassRate } = result;

    for (const categoryResult of categoryResults) {
      for (const test of categoryResult.tests) {
        const status = test.result ? (test.result.passed ? 'PASS' : 'FAIL') : 'NOT TESTED';
        const value = test.result?.value || '';

        lines.push(
          [
            escapeCsvField(transceiver.name),
            escapeCsvField(transceiver.manufacturer),
            escapeCsvField(transceiver.type),
            escapeCsvField(categoryResult.category.name),
            escapeCsvField(test.testCase.name),
            status,
            escapeCsvField(value),
            categoryResult.grade,
            `${categoryResult.passRate}%`
          ].join(',')
        );
      }
    }

    lines.push(
      [
        escapeCsvField(transceiver.name),
        escapeCsvField(transceiver.manufacturer),
        escapeCsvField(transceiver.type),
        'OVERALL',
        '',
        '',
        '',
        overallGrade,
        `${overallPassRate}%`
      ].join(',')
    );
  }

  return lines.join('\n');
}

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

export function exportToCSV(results: TransceiverResults[]): void {
  if (!results || results.length === 0) {
    console.error('No results to export');
    alert('No test results available to export. Please select and compare transceivers first.');
    return;
  }

  try {
    const csvContent = formatResultsForExport(results);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `interconnect-test-results-${Date.now()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    alert('Failed to export data. Please try again.');
  }
}
