const API_KEY = "your-api-key-here"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall/timemachine";
const GEOCODING_URL = "https://api.opencagedata.com/geocode/v1/json";

/**
 * Fetch historical precipitation data for a given location and date.
 * @param lat Latitude of the location.
 * @param lon Longitude of the location.
 * @param date Unix timestamp (in seconds) for the desired date.
 * @returns Array of hourly precipitation amounts.
 */
export async function fetchPrecipitationData(
  lat: number,
  lon: number,
  date: number
): Promise<number[]> {
  console.log(`Fetching data for lat: ${lat}, lon: ${lon}, date: ${date}`);

  // Simulate dummy data: 24 hours of random precipitation values (in mm)
  const dummyData = Array.from({ length: 24 }, () => Math.random() * 10);

  // Simulate a network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyData), 500);
  });
}

/**
 * Fetch autocomplete suggestions for place names.
 * @param query The place name query.
 * @returns Array of suggested place names with coordinates.
 */
export async function fetchGeocodingSuggestions(query: string): Promise<{ formatted: string; lat: number; lon: number }[]> {
  console.log(`Fetching geocoding suggestions for query: "${query}"`);

  // Simulate dummy geocoding suggestions
  const dummySuggestions = [
    { formatted: "San Francisco, CA, USA", lat: 37.7749, lon: -122.4194 },
    { formatted: "San Jose, CA, USA", lat: 37.3382, lon: -121.8863 },
    { formatted: "Santa Clara, CA, USA", lat: 37.3541, lon: -121.9552 },
    { formatted: "Sacramento, CA, USA", lat: 38.5816, lon: -121.4944 },
    { formatted: "Sunnyvale, CA, USA", lat: 37.3688, lon: -122.0363 },
  ];

  // Filter dummy suggestions based on the query
  const filteredSuggestions = dummySuggestions.filter((suggestion) =>
    suggestion.formatted.toLowerCase().includes(query.toLowerCase())
  );

  // Simulate a network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(filteredSuggestions), 300);
  });
}

/**
 * Parse input into coordinates if possible.
 * @param input The user input.
 * @returns Coordinates object or null if invalid.
 */
export function parseCoordinates(input: string): { lat: number; lon: number } | null {
  const parts = input.split(",").map((part) => parseFloat(part.trim()));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return { lat: parts[0], lon: parts[1] };
  }
  return null;
}
