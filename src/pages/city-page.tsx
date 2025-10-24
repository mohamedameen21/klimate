import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

import WeatherSkeleton from "@//components/loading-skeleton";
import type { Coordinates } from "@/api/types";
import { useWeatherQuery, useWeatherForecastQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@//components/ui/alert";
import CurrentWeather from "@/components/curent-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/WeatherForecast";
import FavoriteButton from "@/components/favorite-button";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();

  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates: Coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useWeatherForecastQuery(coordinates);

  if (forecastQuery.isFetching || weatherQuery.isFetching) {
    return <WeatherSkeleton />;
  }

  if (forecastQuery.error || weatherQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          Failed to load weather data. Please try again
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data?.sys?.country}
        </h1>
        <div>
          {/* favorite button */}
          <FavoriteButton data={{...weatherQuery.data, name: params.cityName || ""}}/>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-8">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemperature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
