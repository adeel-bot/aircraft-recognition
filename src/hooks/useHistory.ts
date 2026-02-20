import { useState, useCallback, useEffect } from "react";
import { HistoryEntry, PredictionResult } from "@/lib/types";

const STORAGE_KEY = "aircraft-history";
const MAX_ENTRIES = 10;

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function resizeImage(dataUrl: string, maxDim = 200): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(maxDim / img.width, maxDim / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = dataUrl;
  });
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch { /* storage full – silently ignore */ }
  }, [history]);

  const addEntry = useCallback(async (imageDataUrl: string, prediction: PredictionResult) => {
    const thumb = await resizeImage(imageDataUrl);
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      imageDataUrl: thumb,
      prediction,
      timestamp: Date.now(),
    };
    setHistory((prev) => [entry, ...prev].slice(0, MAX_ENTRIES));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addEntry, clearHistory };
}
