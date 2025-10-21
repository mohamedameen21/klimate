import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { format } from "date-fns";

import type { WeatherData } from "@/api/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@//components/ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data;

  const getWindDirection = (deg: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(deg / 22.5) % 16;

    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: format(new Date(sys.sunrise * 1000), "hh:mm a"),
      icon: Sunrise,
      colour: "text-orange-500",
    },
    {
      title: "Sunset",
      value: format(new Date(sys.sunset * 1000), "hh:mm a"),
      icon: Sunset,
      colour: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      colour: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      colour: "text-purple-500",
    },
  ];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2">
            {details.map((detail) => {
            const Icon = detail.icon;

            return (
              <>
                <div
                  key={detail.title}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  <Icon className={detail.colour} />
                  <div>
                    <p className="text-sm font-medium leading-none">{detail.title}</p>
                    <p className="text-sm text-muted-foreground">{detail.value}</p>
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

export default WeatherDetails;
