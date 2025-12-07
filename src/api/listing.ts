import type { RequestBody } from "./types";

const API_URL = import.meta.env.VITE_API_URL
export const fetchProductListing = async (requestBody: RequestBody) => {
  if (!API_URL) { throw new Error("API_URL is not defined") }
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log({ data });
    return data;
  } catch (error) {
    console.error({ error });
    return null;
  }
}