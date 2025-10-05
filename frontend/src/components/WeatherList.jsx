import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { weatherApi } from '../services/api';
import WeatherCard from './WeatherCard';
import { RefreshCw, Cloud, LogOut, User, Search } from 'lucide-react';

const WeatherList = () => {
  const { user, logout } = useAuth0();
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await weatherApi.getAllWeather();
      if (response.success) {
        setWeatherData(response.data);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleAddCity = async () => {
    // placeholder — integrate with your add-city API or modal
    if (!query.trim()) return;
    try {
      // Example: await weatherApi.addCity({ name: query })
      // then refetch:
      await fetchWeatherData();
      setQuery('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#11162A] via-[#1b2540] to-[#0f1724] text-white">
      {/* centered header */}
      <header className="max-w-5xl mx-auto pt-12 px-4">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="opacity-95">
                <path d="M12 2C13.66 2 15.2 2.67 16.22 3.78C17.23 4.87 17.71 6.29 17.57 7.72C19.42 8.15 20.86 9.78 20.86 11.72C20.86 14.23 18.83 16.25 16.32 16.25H7.68C5.17 16.25 3.14 14.23 3.14 11.72C3.14 9.51 4.86 7.72 7 7.37C7.22 5.75 8.43 4.38 10.02 3.77C10.83 3.45 11.4 3.01 12 2Z" fill="white" opacity="0.95"/>
              </svg>
              <h1 className="text-2xl sm:text-3xl font-semibold">Weather App</h1>
            </div>
            <p className="text-sm text-gray-300 mt-2">Add and view weather cards for your favorite cities</p>
          </div>
        </div>

        {/* controls row */}
        <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
          {/* search + add */}
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCity()}
                placeholder="Enter a city"
                className="pl-10 pr-4 py-2 rounded-full bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 w-72"
              />
            </div>
            <button
              onClick={handleAddCity}
              className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white"
            >
              Add City
            </button>
          </div>

          {/* user actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-200 bg-gray-900 px-3 py-2 rounded-full">
              <User className="w-4 h-4" />
              <span className="text-sm">{user?.email || 'Guest'}</span>
            </div>

            <button
              onClick={fetchWeatherData}
              className="flex items-center gap-2 bg-gray-800/60 px-3 py-2 rounded-full hover:bg-gray-800 transition"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-full hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 mt-10 pb-16">
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 animate-spin mx-auto text-white/80" />
              <p className="text-gray-300 mt-4">Loading weather data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <Cloud className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchWeatherData}
                className="bg-indigo-600 px-5 py-2 rounded-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {weatherData.map((weather, idx) => (
              <WeatherCard key={weather.cityCode || idx} weather={weather} index={idx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherList;
