import React from 'react';
import { X, Wind, Sun, Droplets, Thermometer } from 'lucide-react';

const gradientMap = {
  Clear: 'from-green-400 to-emerald-400',
  Clouds: 'from-indigo-500 to-violet-500',
  Rain: 'from-orange-400 to-amber-500',
  Snow: 'from-sky-300 to-blue-400',
  Mist: 'from-rose-400 to-pink-500',
  Default: 'from-sky-400 to-indigo-500',
};

const getWeatherIconUrl = (icon) =>
  icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

const WeatherCard = ({ weather, onClose }) => {
  if (weather?.error) {
    return (
      <div className="rounded-lg overflow-hidden shadow-md">
        <div className="p-4 bg-red-50 border border-red-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-red-800">{weather.name}</h3>
            <button onClick={() => onClose?.(weather)} className="p-1 rounded-full">
              <X className="w-4 h-4 text-red-700" />
            </button>
          </div>
          <p className="text-sm text-red-600 mt-2">Error: {weather.error}</p>
        </div>
      </div>
    );
  }

  const conditionKey = (weather.description || 'Default').split(' ')[0];
  const gradientClass = gradientMap[conditionKey] || gradientMap.Default;
  const iconUrl = getWeatherIconUrl(weather.icon);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className={`p-5 bg-gradient-to-r ${gradientClass}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              {weather.name}
              <span className="text-sm font-normal text-white/90">, {weather.country || ''}</span>
            </h3>
            <p className="text-xs text-white/80 mt-1 capitalize">{weather.description}</p>
          </div>

          <div className="flex items-start gap-3">
            {iconUrl ? (
              <img src={iconUrl} alt={weather.description} className="w-16 h-16" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                ☁️
              </div>
            )}
            <button
              onClick={() => onClose?.(weather)}
              className="text-white/90 p-1 rounded-full hover:bg-white/10"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <div className="text-4xl font-bold text-white">{Math.round(weather.temp ?? 0)}°C</div>
            <div className="text-sm text-white/90 mt-1">Min: {Math.round(weather.minTemp ?? 0)}°C</div>
            <div className="text-sm text-white/90">Max: {Math.round(weather.maxTemp ?? 0)}°C</div>
          </div>

          <div className="text-right">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl text-white/95">
              {weather.iconEmoji || ''}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-gray-300">
          <div>
            <div className="font-medium">Pressure</div>
            <div className="text-xs opacity-80">{weather.pressure ?? '—'} hPa</div>
          </div>

          <div>
            <div className="font-medium">Humidity</div>
            <div className="text-xs opacity-80">{weather.humidity ?? '—'}%</div>
          </div>

          <div>
            <div className="font-medium">Visibility</div>
            <div className="text-xs opacity-80">
              {weather.visibility != null ? `${weather.visibility} km` : '—'}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-3 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4" />
            <span>{weather.windSpeed ?? '—'} m/s</span>
          </div>

          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4" />
            <span>{weather.humidity ?? '—'}%</span>
          </div>

          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4" />
            <span className="capitalize">{weather.description ?? ''}</span>
          </div>
        </div>

        {weather.fromCache && (
          <div className="mt-2">
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              Cached Data
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;