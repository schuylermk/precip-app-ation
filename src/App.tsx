import { useState } from "react";
import "./App.css";
import LocationInput from "./components/LocationInput";
import PrecipChart from "./components/PrecipChart";
import { useWeatherData } from "./hooks/useWeatherData";

function App() {
  const [location, setLocation] = useState<string | null>(null);
  const { data: precipitationData, loading, error } = useWeatherData(location);

  const handleLocationSearch = (location: string) => {
    console.log("Searched for location:", location);
    setLocation(location); // Update location state
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-gray-100">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Precip App</h1>
        <p className="text-gray-400">
          Search for precipitation data by location
        </p>
      </header>

      <div className="w-full max-w-md p-6 bg-gray-700 rounded-lg shadow-md">
        <LocationInput onSearch={handleLocationSearch} />
      </div>

      <div className="w-full max-w-4xl mt-8 p-6 bg-gray-700 rounded-lg shadow-md">
        {loading && <p className="text-gray-400">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {precipitationData && <PrecipChart data={precipitationData} />}
      </div>
    </div>
  );
}

export default App;
