// Weather API Client Implementation
// Complete the TODOs below to build a working weather client

import {
  CurrentWeather,
  WeatherForecast,
  City,
  CurrentWeatherResponse,
  ForecastResponse,
  GeocodingResponse,
} from './types';

/**
 * WeatherClient class for interacting with the Open-Meteo API
 */
class WeatherClient {
  private readonly weatherBaseURL: string;
  private readonly geocodingBaseURL: string;

  constructor() {
    this.weatherBaseURL = 'https://api.open-meteo.com/v1/forecast';
    this.geocodingBaseURL = 'https://geocoding-api.open-meteo.com/v1/search';
  }

  /**
   * Private helper method to make HTTP requests
   * @param url - The full URL to fetch
   * @returns Parsed JSON response
   */
  private async request<T>(url: string): Promise<T> {
    // TODO: Implement the request method
    // 1. Make a fetch request to the URL
    // 2. Check if the response is ok (status 200-299)
    // 3. If not ok, throw an error with the status code
    // 4. Parse the response as JSON
    // 5. Return the parsed data
    //
    // Hint: Use async/await and try/catch for error handling

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error with status ${response.status}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      throw new Error('An error occurred');
    }
  }

  /**
   * Get current weather for a location
   * @param latitude - Latitude of the location (-90 to 90)
   * @param longitude - Longitude of the location (-180 to 180)
   * @returns Current weather data
   */
  async getCurrentWeather(latitude: number, longitude: number): Promise<CurrentWeather> {
    // TODO: Implement getCurrentWeather
    // 1. Validate latitude is between -90 and 90
    // 2. Validate longitude is between -180 and 180
    // 3. Build the URL with query parameters:
    //    - latitude
    //    - longitude
    //    - current_weather=true
    // 4. Use this.request<CurrentWeatherResponse>() to fetch data
    // 5. Extract and return just the current_weather object from the response
    //
    // Example URL: https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true
    //
    // Hint: Use URLSearchParams to build query parameters
    if (latitude < -90 || latitude > 90) {
      throw new Error('latitude is not between -90 and 90');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('longitude is not between -180 and 180');
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const data = await this.request<CurrentWeatherResponse>(url);
    return data.current_weather;
  }

  /**3
   * Get weather forecast for a location
   * @param latitude - Latitude of the location (-90 to 90)
   * @param longitude - Longitude of the location (-180 to 180)
   * @param days - Number of days to forecast (default 7, max 16)
   * @returns Weather forecast data
   */
  async getWeatherForecast(
    latitude: number,
    longitude: number,
    days: number = 7,
  ): Promise<WeatherForecast> {
    // TODO: Implement getWeatherForecast
    // 1. Validate latitude is between -90 and 90
    // 2. Validate longitude is between -180 and 180
    // 3. Validate days is between 1 and 16
    // 4. Build the URL with query parameters:
    //    - latitude
    //    - longitude
    //    - daily=temperature_2m_max,temperature_2m_min,precipitation_sum
    //    - forecast_days=<days>
    //    - timezone=auto (important for correct dates!)
    // 5. Use this.request<ForecastResponse>() to fetch data
    // 6. Return the forecast data
    //
    // Example URL: https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto
    if (latitude < -90 || latitude > 90) {
      throw new Error(`latitude ${latitude} is not between -90 and 90`);
    }

    if (longitude < -180 || longitude > 180) {
      throw new Error(`longitude ${longitude} is not between -180 and 180`);
    }

    if (days < 1 || days > 16) {
      throw new Error(`Days ${days} is not between 1 and 16`);
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=${days}&timezone=auto`;

    // const url =
    //   'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&forecast_days=7&timezone=auto';

    const response = await this.request<ForecastResponse>(url);
    return response;
  }

  /**
   * Search for a city by name
   * @param cityName - Name of the city to search for
   * @returns City data or null if not found
   */
  async searchCity(cityName: string): Promise<City | null> {
    // TODO: Implement searchCity
    // 1. Validate cityName is not empty
    // 2. Build the URL with query parameters:
    //    - name=<cityName>
    //    - count=1 (we only want the top result)
    // 3. Use this.request<GeocodingResponse>() to fetch data
    // 4. Check if results array exists and has at least one item
    // 5. If yes, return the first result
    // 6. If no, return null
    //
    // Example URL: https://geocoding-api.open-meteo.com/v1/search?name=New%20York&count=1
    //
    // Hint: URL-encode the city name using encodeURIComponent()

    if (!cityName) {
      throw new Error('String is empty');
    }

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;
    const response = await this.request<GeocodingResponse>(url);

    if (response.results && response.results.length > 0) {
      const city = response.results[0];
      return {
        name: city.name,
        latitude: city.latitude,
        longitude: city.longitude,
        country: city.country,
        admin1: city.admin1,
        id: city.id,
      };
    }

    return null;
  }
}

// Test function to verify your implementation
async function main() {
  const client = new WeatherClient();

  console.log('=== Weather API Client Tests ===\n');

  // Test 1: Current Weather for New York City
  console.log('=== Test 1: Current Weather (NYC) ===');
  try {
    const weather = await client.getCurrentWeather(40.7128, -74.006);
    console.log('NYC Current Weather:');
    console.log(`  Temperature: ${weather.temperature}°C`);
    console.log(`  Wind Speed: ${weather.windspeed} km/h`);
    console.log(`  Weather Code: ${weather.weathercode}`);
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }

  console.log('\n=== Test 2: 7-Day Forecast (NYC) ===');
  try {
    const forecast = await client.getWeatherForecast(40.7128, -74.006);
    console.log('7-Day Forecast for NYC:');
    for (let i = 0; i < forecast.daily.time.length; i++) {
      console.log(
        `  ${forecast.daily.time[i]}: ` +
          `Max ${forecast.daily.temperature_2m_max[i]}°C, ` +
          `Min ${forecast.daily.temperature_2m_min[i]}°C, ` +
          `Precipitation: ${forecast.daily.precipitation_sum[i]}mm`,
      );
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }

  console.log('\n=== Test 3: City Search ===');
  try {
    const city = await client.searchCity('London');
    if (city) {
      console.log(`Found city: ${city.name}`);
      console.log(`  Latitude: ${city.latitude}`);
      console.log(`  Longitude: ${city.longitude}`);
      console.log(`  Country: ${city.country}`);
    } else {
      console.log('City not found');
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }

  console.log('\n=== Test 4: Error Handling ===');
  try {
    // This should throw an error (invalid latitude)
    await client.getCurrentWeather(999, 0);
  } catch (error) {
    console.log('Caught expected error:', (error as Error).message);
  }

  console.log('\n=== Test 5: Search for Weather by City Name ===');
  try {
    // Search for Paris
    const paris = await client.searchCity('Paris');
    if (paris) {
      console.log(`\nWeather for ${paris.name}, ${paris.country}:`);
      const weather = await client.getCurrentWeather(paris.latitude, paris.longitude);
      console.log(`  Temperature: ${weather.temperature}°C`);
      console.log(`  Wind Speed: ${weather.windspeed} km/h`);
    }
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
}

// Run the tests
main().catch(console.error);
