import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

import type { WeatherData, GeocodeData } from "@/api/types";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@//components/ui/card";

import { Card } from "./ui/card";

interface CurrentWeatherProps {
  data?: WeatherData;
  location?: GeocodeData;
}

const formatTemperature = (temp: number) => {
  return `${Math.round(temp)}°C`;
};

const CurrentWeather = ({ data, location }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
  } = data;

  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {location && (
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-bold">{location?.name},</h2>
                      {location?.state && (
                        <span className="text-muted-foreground">
                          {location.state}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {location?.country}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <p className="text-7xl font-bold">{formatTemperature(temp)}</p>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feels like {formatTemperature(feels_like)}
                  </p>
                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex items-center gap-1 text-blue-500">
                      <ArrowDown className="h-4 w-4" />
                      <span>{formatTemperature(temp_min)}</span>
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <ArrowUp className="h-4 w-4" />
                      <span>{formatTemperature(temp_max)}</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>

                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {currentWeather.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
