// TypeScript Type Definitions for Weather API Client

// TODO: Define the CurrentWeather interface
// Based on the API response from:
// https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true
//
// The response looks like:
// {
//   "current_weather": {
//     "temperature": 15.3,
//     "windspeed": 10.5,
//     "winddirection": 270,
//     "weathercode": 3,
//     "time": "2025-01-15T12:00"
//   }
// }
export interface CurrentWeather {
  // TODO: Add properties for temperature, windspeed, winddirection, weathercode, and time
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

// TODO: Define the DailyForecast interface
// Based on the API response from:
// https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=America/New_York
//
// The response looks like:
// {
//   "daily": {
//     "time": ["2025-01-15", "2025-01-16", ...],
//     "temperature_2m_max": [15.3, 16.2, ...],
//     "temperature_2m_min": [8.1, 9.0, ...],
//     "precipitation_sum": [0.0, 2.5, ...]
//   }
// }
export interface DailyForecast {
  time: string[]; // Array of dates like "2025-01-15"
  // TODO: Add properties for temperature_2m_max, temperature_2m_min, and precipitation_sum
  // These are all arrays of numbers
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
}

// TODO: Define the WeatherForecast interface
// This is what your getWeatherForecast() method will return
// It should contain the daily forecast data
export interface WeatherForecast {
  // TODO: Add a daily property of type DailyForecast
  daily: DailyForecast;
}

// TODO: Define the City interface
// Based on the API response from:
// https://geocoding-api.open-meteo.com/v1/search?name=New%20York&count=1
//
// The response looks like:
// {
//   "results": [
//     {
//       "name": "New York",
//       "latitude": 40.71,
//       "longitude": -74.01,
//       "country": "United States",
//       "admin1": "New York",
//       "id": 5128581
//     }
//   ]
// }
export interface City {
  // TODO: Add properties for name, latitude, longitude, and country
  // Also add admin1 (state/region) and id (both optional)

  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  id?: number;
}

// Internal API response types (for parsing API responses)
// You may not need to modify these, but they help with type safety

export interface CurrentWeatherResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
}

export interface ForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
  };
}

export interface GeocodingResponse {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
    id: number;
  }>;
}
