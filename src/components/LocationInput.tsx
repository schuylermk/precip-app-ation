import { useState } from "react";
import { fetchGeocodingSuggestions, parseCoordinates } from "../utils/Api";

interface LocationInputProps {
  onSearch: (location: string) => void;
}

export default function LocationInput({ onSearch }: LocationInputProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    { formatted: string; lat: number; lon: number }[]
  >([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Fetch autocomplete suggestions for place names
    if (value.trim() && isNaN(Number(value))) {
      const results = await fetchGeocodingSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const coordinates = parseCoordinates(input);
    if (coordinates) {
      onSearch(`${coordinates.lat},${coordinates.lon}`);
    } else if (input.trim()) {
      onSearch(input); // Assume it's a place name
    } else {
      alert("Please enter a valid location.");
    }
  };

  const handleSuggestionClick = (suggestion: {
    formatted: string;
    lat: number;
    lon: number;
  }) => {
    setInput(suggestion.formatted);
    setSuggestions([]);
    onSearch(`${suggestion.lat},${suggestion.lon}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 p-4">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter coordinates or place name"
        className="w-full px-4 py-2 border border-gray-500 rounded-lg shadow-sm bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="bg-gray-700 text-gray-100 rounded-lg shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
            >
              {suggestion.formatted}
            </li>
          ))}
        </ul>
      )}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() =>
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                onSearch(`${latitude},${longitude}`);
              },
              (error) => alert("Unable to fetch your current location.")
            )
          }
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Use Current Location
        </button>
      </div>
    </form>
  );
}
