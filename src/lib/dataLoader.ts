import type { Transceiver, TestCategory, TestCase, TestResult } from '../types';

export async function loadTransceivers(): Promise<Transceiver[]> {
  console.log('Fetching transceivers from /data/transceivers.json');
  const response = await fetch('/data/transceivers.json');
  console.log('Transceivers response:', response.status, response.ok);
  if (!response.ok) {
    throw new Error('Failed to load transceivers');
  }
  const data = await response.json();
  console.log('Transceivers loaded:', data);
  return data;
}

export async function loadTestCategories(): Promise<TestCategory[]> {
  console.log('Fetching test categories from /data/test-categories.json');
  const response = await fetch('/data/test-categories.json');
  console.log('Test categories response:', response.status, response.ok);
  if (!response.ok) {
    throw new Error('Failed to load test categories');
  }
  const data = await response.json();
  console.log('Test categories loaded:', data);
  return data;
}

export async function loadTestCases(): Promise<TestCase[]> {
  console.log('Fetching test cases from /data/test-cases.json');
  const response = await fetch('/data/test-cases.json');
  console.log('Test cases response:', response.status, response.ok);
  if (!response.ok) {
    throw new Error('Failed to load test cases');
  }
  const data = await response.json();
  console.log('Test cases loaded:', data);
  return data;
}

export async function loadTestResults(transceiverId: string): Promise<Omit<TestResult, 'id' | 'transceiver_id' | 'created_at' | 'tested_at'>[]> {
  try {
    const url = `/data/test-results-${transceiverId}.json`;
    console.log('Fetching test results from', url);
    const response = await fetch(url);
    console.log('Test results response:', response.status, response.ok);
    if (!response.ok) {
      console.log('Test results not found, returning empty array');
      return [];
    }
    const data = await response.json();
    console.log('Test results loaded:', data);
    return data;
  } catch (error) {
    console.error('Error loading test results:', error);
    return [];
  }
}
