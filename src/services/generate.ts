import { API_URL } from "@/lib/api";

export interface GenerateRequest {
  content: string;
}

export interface GenerateResponse {
  result: string;
}

export async function generateContent(
  body: GenerateRequest
): Promise<GenerateResponse> {
  console.log("Sending to backend:", body);

  const response = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  console.log("Status:", response.status);

  const text = await response.text();

  console.log("Response:", text);

  if (!response.ok) {
    throw new Error(text);
  }

  return JSON.parse(text);
}