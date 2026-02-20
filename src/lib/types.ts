export interface PredictionItem {
  aircraft: string;
  confidence: number;
}

export interface PredictionResult {
  aircraft: string;
  confidence: number;
  top3: PredictionItem[];
}

export interface HistoryEntry {
  id: string;
  imageDataUrl: string;
  prediction: PredictionResult;
  timestamp: number;
}

export type ConfidenceLevel = "high" | "medium" | "low";

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence > 70) return "high";
  if (confidence > 40) return "medium";
  return "low";
}
