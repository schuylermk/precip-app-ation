import { z } from "zod";

export const PrecipitationResponseSchema = z.object({
  hourly: z
    .array(
      z.object({
        rain: z.object({ "1h": z.number().optional() }).optional(),
      })
    )
    .optional(),
});

export const GeocodingPlaceSchema = z.array(
  z.object({
    name: z.string(),
    state: z.string().optional(),
    country: z.string(),
    lat: z.number(),
    lon: z.number(),
  })
);