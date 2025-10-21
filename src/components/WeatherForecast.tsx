import { format } from "date-fns";

import type { ForecastData } from "@/api/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@//components/ui/card";
import { ArrowDown, Droplet, Wind } from "lucide-react";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const WeatherForecast = ({ data }: WeatherForecastProps) => {
  const dailyForcast = data.list.reduce((acc, curr) => {
    const date = format(new Date(curr.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: curr.main.temp_min,
        temp_max: curr.main.temp_max,
        humidity: curr.main.humidity,
        wind: curr.wind.speed,
        weather: curr.weather[0],
        date: curr.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, curr.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, curr.main.temp_max);
    }

    return acc;
  }, {}) as Record<string, DailyForecast>;

  const nextDays = Object.values(dailyForcast).slice(0, 6); // Get next 5 days

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {nextDays.map((day) => {
              return (
                <>
                  <div
                    key={day.date}
                    className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
                  >
                    <div>
                      <p className="font-medium">
                        {format(new Date(day.date * 1000), "EEEE, MMMM d")}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {day.weather.description}
                      </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <span className="flex items-center text-blue-500">
                            <ArrowDown className="mr-1 h-4 w-4" />
                            {day.temp_min}°C
                        </span>
                        <span className="flex items-center text-red-500">
                            <ArrowDown className="rotate-180 mr-1 h-4 w-4" />
                            {day.temp_max}°C
                        </span>
                    </div>

                    <div className="flex justify-center gap-4">
                       <span className="flex items-center gap-1">
                            <Droplet className="h-4 w-4 text-blue-500" />
                            {day.humidity}%
                       </span>
                       <span className="flex items-center gap-1">
                            <Wind className="rotate-180 h-4 w-4 text-cyan-500" />
                            {day.wind} m/s
                       </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default WeatherForecast;
