import { useState } from 'react';
import { Download, GitCompare } from 'lucide-react';
import { useTransceivers } from '../hooks/useTransceivers';
import { useTransceiverResults } from '../hooks/useTransceiverResults';
import { TransceiverCard } from './TransceiverCard';
import { exportToCSV } from '../utils/export';

export function ComparisonView() {
  const { transceivers, loading: loadingTransceivers } = useTransceivers();
  const [selectedIds, setSelectedIds] = useState<(string | null)[]>([null, null, null, null]);
  const [compareIds, setCompareIds] = useState<(string | null)[]>([null, null, null, null]);

  const results1 = useTransceiverResults(compareIds[0]);
  const results2 = useTransceiverResults(compareIds[1]);
  const results3 = useTransceiverResults(compareIds[2]);
  const results4 = useTransceiverResults(compareIds[3]);

  const allResults = [results1, results2, results3, results4];

  console.log('ComparisonView - compareIds:', compareIds);
  console.log('ComparisonView - allResults:', allResults.map(r => ({ hasResults: !!r.results, loading: r.loading, error: r.error })));

  const handleSelectChange = (index: number, value: string) => {
    const newSelectedIds = [...selectedIds];
    newSelectedIds[index] = value === '' ? null : value;
    setSelectedIds(newSelectedIds);
  };

  const handleCompare = () => {
    console.log('Compare clicked with selections:', selectedIds);
    setCompareIds([...selectedIds]);
  };

  const handleExport = () => {
    const resultsToExport = allResults
      .map(r => r.results)
      .filter(r => r !== null);

    if (resultsToExport.length > 0) {
      exportToCSV(resultsToExport);
    }
  };

  const hasAnySelection = selectedIds.some(id => id !== null);
  const hasComparison = compareIds.some(id => id !== null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Interconnect Transceiver Comparison
          </h1>
          <p className="text-slate-600">
            Compare up to 4 interconnect transceivers and analyze their resilience test results
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Select Transceivers to Compare
            </h2>
            <div className="flex items-center gap-3">
              {hasAnySelection && (
                <button
                  onClick={handleCompare}
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare
                </button>
              )}
              {hasComparison && (
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Transceiver {index + 1}
                </label>
                <select
                  value={selectedIds[index] || ''}
                  onChange={(e) => handleSelectChange(index, e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loadingTransceivers}
                >
                  <option value="">Select...</option>
                  {transceivers.map((transceiver) => (
                    <option key={transceiver.id} value={transceiver.id}>
                      {transceiver.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {hasComparison && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {allResults.map((result, index) => (
              <div key={index} className="min-w-0">
                <TransceiverCard results={result.results} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
