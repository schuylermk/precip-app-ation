import { useEffect, useState } from "react";
import { fetchGeocodingSuggestions, fetchPrecipitationData } from "../utils/Api";

interface WeatherData {
  data: number[] | null;
  loading: boolean;
  error: string | null;
}

export function useWeatherData(location: string | null): WeatherData {
  const [data, setData] = useState<number[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let lat: number, lon: number;

        // Check if the location is in "lat,lon" format
        const coordinates = location.split(",").map(Number);
        if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
          [lat, lon] = coordinates;
        } else {
          // Assume it's a place name and resolve it to coordinates
          const suggestions = await fetchGeocodingSuggestions(location);
          if (suggestions.length === 0) {
            throw new Error("Unable to resolve location. Please try a different place name.");
          }
          const resolvedLocation = suggestions[0]; // Use the first suggestion
          lat = resolvedLocation.lat;
          lon = resolvedLocation.lon;
        }

        const currentDate = Math.floor(Date.now() / 1000);
        const result = await fetchPrecipitationData(lat, lon, currentDate);
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to fetch precipitation data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  return { data, loading, error };
}