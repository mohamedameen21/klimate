import { API_CONFIG } from "./config"
import type { Coordinates, ForecastData, GeocodeData, WeatherData } from "./types";

class WeatherAPI {
  private createUrl(
    endpoint: string,
    params: Record<string, string | number | boolean>
  ) {

    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY ,
      ...params,
    });

    return `${endpoint}?${searchParams.toString()}`
  }

  // TODO: We can use axios for better error handling and features
  private async fetchData<T>(url: string) : Promise<T> {
    const response = await fetch(url);

    if(!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  }

  async getCurrentWeather({lat, lon} : Coordinates) : Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: API_CONFIG.DEFAULT_PARAMS.units
    } );

    return this.fetchData<WeatherData>(url);
  }

  async getForecast({lat, lon} : Coordinates) : Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
        lat: lat.toString(),
        lon: lon.toString(),
        units: API_CONFIG.DEFAULT_PARAMS.units
    } );

    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({lat, lon} : Coordinates) : Promise<GeocodeData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_CODING_URL}/reverse`, {
        lat: lat.toString(),
        lon: lon.toString(),
        limit: 1
    } );

    return this.fetchData<GeocodeData[]>(url);
  }
}

export const weatherAPI = new WeatherAPI();