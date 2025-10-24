import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geolocation";
import { useReverseGeocodeQuery, useWeatherForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import CurrentWeather from "@/components/curent-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/WeatherForecast";
import FavoriteCities from "@/components/FavoriteCities";

const WeatherDashboard = () => {
  const { coordinates, error, getLocation, loading } = useGeoLocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useWeatherForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  if (loading || weatherQuery.isFetching || forecastQuery.isFetching || locationQuery.isFetching) {
    return <WeatherSkeleton />;
  }

  if (error || !coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="w-fit p-3"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const location = locationQuery?.data?.[0];

  if(weatherQuery.error || forecastQuery.error || locationQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="w-fit p-3"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Favourite Cities */}
      <FavoriteCities/>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          variant="outline"
          size="icon"
          disabled={loading || weatherQuery.isFetching || forecastQuery.isFetching || locationQuery.isFetching}
          onClick={handleRefresh}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
        </Button>
      </div>

      {/* Current and Hourly weather */}
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather data={weatherQuery.data} location={location} />
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

export default WeatherDashboard;
