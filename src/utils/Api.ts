import { GeocodingPlace } from "./types";
import { GeocodingPlaceSchema, PrecipitationResponseSchema } from "./validation";

const API_KEY = import.meta.env.VITE_PRECIP_APP_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5/onecall/timemachine";
const GEOCODING_URL = "http://api.openweathermap.org/geo/1.0/direct";

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
  const url = new URL(BASE_URL);
  url.searchParams.append("lat", lat.toString());
  url.searchParams.append("lon", lon.toString());
  url.searchParams.append("dt", date.toString());
  url.searchParams.append("appid", API_KEY);

  console.log(`Fetching precipitation data from: ${url.origin}${url.pathname}`);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const validatedData = PrecipitationResponseSchema.parse(data);

    // Extract hourly precipitation data
    const precipitation = validatedData.hourly?.map((hour) => hour.rain?.["1h"] || 0) || [];

    return precipitation;
  } catch (error) {
    console.error("Error fetching precipitation data:", error);
    throw error;
  }
}

/**
 * Fetch autocomplete suggestions for place names.
 * @param query The place name query.
 * @returns Array of suggested place names with coordinates.
 */
type GeocodingPlaceWithFormatted = GeocodingPlace & {
  formatted: string;
};

export async function fetchGeocodingSuggestions(query: string): Promise<GeocodingPlaceWithFormatted[]> {
  const url = new URL(GEOCODING_URL);
  url.searchParams.append("q", query);
  url.searchParams.append("limit", "5");
  url.searchParams.append("appid", API_KEY);

  console.log(`Fetching geocoding suggestions from: ${url.origin}${url.pathname}`);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Geocoding API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const validatedData = GeocodingPlaceSchema.parse(data);

    return validatedData.map((place) => ({
      ...place,
      formatted: `${place.name}, ${place.state || ""}, ${place.country}`.trim(),
    }));
  } catch (error) {
    console.error("Error fetching geocoding suggestions:", error);
    throw error;
  }
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
