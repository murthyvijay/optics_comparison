import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./hooks/useTransceivers', () => ({
  useTransceivers: () => ({
    transceivers: [],
    loading: false,
    error: null
  })
}));

vi.mock('./hooks/useTransceiverResults', () => ({
  useTransceiverResults: () => ({
    results: null,
    loading: false,
    error: null
  })
}));

describe('App', () => {
  it('should render the comparison view', () => {
    render(<App />);
    expect(screen.getByText(/Interconnect Transceiver Comparison/i)).toBeInTheDocument();
  });

  it('should render transceiver selection interface', () => {
    render(<App />);
    expect(screen.getByText(/Select Transceivers to Compare/i)).toBeInTheDocument();
  });
});
