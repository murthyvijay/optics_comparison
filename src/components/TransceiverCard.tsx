import type { TransceiverResults } from '../types';
import { TestCategorySection } from './TestCategorySection';

interface TransceiverCardProps {
  results: TransceiverResults | null;
}

const gradeColors = {
  A: 'bg-green-500',
  B: 'bg-blue-500',
  C: 'bg-yellow-500',
  D: 'bg-orange-500',
  F: 'bg-red-500',
};

export function TransceiverCard({ results }: TransceiverCardProps) {
  console.log('TransceiverCard rendering with results:', results);

  if (!results) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        Select a transceiver to view results
      </div>
    );
  }

  const { transceiver, categoryResults, overallGrade, overallPassRate } = results;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{transceiver.name}</h3>
            <p className="text-blue-100">{transceiver.manufacturer}</p>
            <p className="text-sm text-blue-200">{transceiver.type}</p>
          </div>
          <div className="text-center">
            <div className={`${gradeColors[overallGrade]} w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mb-1`}>
              {overallGrade}
            </div>
            <p className="text-sm text-blue-100">{overallPassRate}%</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {categoryResults.map((categoryResult) => (
          <TestCategorySection
            key={categoryResult.category.id}
            categoryResult={categoryResult}
          />
        ))}
      </div>
    </div>
  );
}
