/*
===========================================
MVP Project: Precipitation History App
===========================================

Core Idea:
- Users can input/select a location.
- App fetches historical precipitation data for 1-day, 3-day, 7-day, 14-day, etc.
- Displays data as a bar or line chart.
- Simple and clean UI.

===========================================
Folder & File Structure:
-------------------------------------------
/components
  - PrecipChart.tsx
    * Renders precipitation data in chart form (e.g., using Chart.js).

/hooks
  - useWeatherData.ts
    * Custom React hook to fetch and manage precipitation history.

/pages
  - Home.tsx
    * Main landing page: search input + precipitation chart.

/utils
  - api.ts
    * Functions to call weather APIs (OpenWeatherMap, Visual Crossing, etc).

/types
  - weather.ts
    * TypeScript types for API responses and formatted data.

Root files:
  - App.tsx
    * Top-level app component. Could include React Router if multi-page later.
  - main.tsx
    * Entry point, renders <App />.
  - index.css
    * Tailwind base + custom styles (optional).

===========================================
Component Responsibilities:
-------------------------------------------
- <PrecipChart />
  - Receives structured data (e.g., array of { date, precipitationAmount }).
  - Displays bar or line graph visualization.

- useWeatherData()
  - Accepts location input (lat/lng or city name).
  - Calls APIs to fetch historical precipitation.
  - Returns loading, error, and data states.

- Home.tsx
  - Location input field.
  - Calls useWeatherData.
  - Passes data to <PrecipChart />.
  - Displays loading and error states cleanly.

- api.ts
  - Abstracted API calls for weather providers.
  - Handles API key usage, request formatting, error handling.

===========================================
New Features:
-------------------------------------------
- Flexible input parsing for coordinates.
- Place name search with geocoding API.
- Autocomplete suggestions for place names.
- Improved error handling and user feedback.

===========================================
Later Expansion (Phase 2+ Ideas):
- Add favorites list.
- Compare multiple locations.
- Add notifications/alerts for drought or heavy rain.
- Predictive forecasting integration.
===========================================
*/