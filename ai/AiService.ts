import { AnalysisResult } from '../types';

// Stub for on-device model integration. Replace with real TFLite/PyTorch.
export async function analyze(filePath: string): Promise<AnalysisResult> {
  // Simulate compute delay
  await new Promise((r) => setTimeout(r, 1200));
  // Return mock result
  return {
    ts: new Date().toISOString(),
    items: [
      { label: 'hunger', percent: 70 },
      { label: 'gas', percent: 20 },
      { label: 'fatigue', percent: 10 }
    ]
  };
}

export type { AnalysisResult };

