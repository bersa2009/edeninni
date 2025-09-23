export type CryClass = 'hunger' | 'gas' | 'fatigue';
export type ResultProbability = { label: CryClass; percent: number };
export type AnalysisResult = { items: ResultProbability[]; ts: string };

export type AppState = 'idle' | 'recording' | 'processing' | 'done';

