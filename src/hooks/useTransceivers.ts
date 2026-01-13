import { useState, useEffect } from 'react';
import { loadTransceivers } from '../lib/dataLoader';
import type { Transceiver } from '../types';

export function useTransceivers() {
  const [transceivers, setTransceivers] = useState<Transceiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTransceivers() {
      try {
        setLoading(true);
        const data = await loadTransceivers();
        const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
        setTransceivers(sortedData);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setTransceivers([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTransceivers();
  }, []);

  return { transceivers, loading, error };
}
