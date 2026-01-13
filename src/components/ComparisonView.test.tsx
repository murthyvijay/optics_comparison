import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComparisonView } from './ComparisonView';

vi.mock('../hooks/useTransceivers', () => ({
  useTransceivers: () => ({
    transceivers: [
      { id: '1', name: 'Transceiver 1', manufacturer: 'Cisco', type: '100G', created_at: '', updated_at: '' },
      { id: '2', name: 'Transceiver 2', manufacturer: 'Arista', type: '400G', created_at: '', updated_at: '' }
    ],
    loading: false,
    error: null
  })
}));

vi.mock('../hooks/useTransceiverResults', () => ({
  useTransceiverResults: () => ({
    results: null,
    loading: false,
    error: null
  })
}));

describe('ComparisonView', () => {
  it('should render comparison selectors', () => {
    render(<ComparisonView />);
    expect(screen.getByText(/Interconnect Transceiver Comparison/i)).toBeInTheDocument();
  });

  it('should render 4 transceiver selection slots', () => {
    render(<ComparisonView />);
    const selects = screen.getAllByRole('combobox');
    expect(selects).toHaveLength(4);
  });

  it('should show Compare button when transceiver is selected', () => {
    render(<ComparisonView />);
    const firstSelect = screen.getAllByRole('combobox')[0];

    fireEvent.change(firstSelect, { target: { value: '1' } });

    expect(screen.getByText('Compare')).toBeInTheDocument();
  });
});
