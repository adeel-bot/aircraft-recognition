import { PredictionResult } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function predictAircraft(imageFile: File): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Invalid image file. Please upload a JPG or PNG image.");
    }
    throw new Error("Recognition system offline. Please try again later.");
  }

  return response.json();
}
