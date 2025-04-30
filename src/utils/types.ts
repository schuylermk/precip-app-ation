export interface HourlyData {
  rain?: { "1h"?: number };
}

export interface PrecipitationResponse {
  hourly?: HourlyData[];
}

export interface GeocodingPlace {
  name: string;
  state?: string;
  country: string;
  lat: number;
  lon: number;
}