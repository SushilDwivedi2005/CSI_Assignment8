import { useState } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setWeather(null);
    setError("");

    try {
      const res = await axios.get("http://localhost:5000/api/weather", {
        params: { city },
      });
      setWeather(res.data);
    } catch (err) {
      setError("Could not fetch weather. Please enter a valid city.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            🌤️ Check Weather
          </h2>
          <input
            type="text"
            placeholder="Enter city name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {weather && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg shadow-md text-center">
            <div className="text-xl font-semibold text-blue-700">
              📍 {weather.city}
            </div>
            <div className="text-4xl font-bold mt-2 text-gray-800">
              🌡️ {weather.temperature}°C
            </div>
            <p className="text-md italic text-gray-600 mt-1">
              “{weather.description}”
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherForm;
