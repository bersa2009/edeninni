export type CryClass = 'hunger' | 'gas' | 'fatigue';

export type ResultProbability = {
  label: CryClass;
  percent: number;
};

export type AnalysisResult = {
  items: ResultProbability[];
  ts: string;
};

export type RecordingState = 'idle' | 'recording' | 'processing' | 'done';

export type AnalysisEvent = 
  | { type: 'START_RECORD' }
  | { type: 'STOP_RECORD' }
  | { type: 'ANALYSIS_DONE'; payload: AnalysisResult }
  | { type: 'RESET' };