import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import type { ForecastData } from "@/api/types";
import { CardContent, CardHeader, CardTitle } from "@//components/ui/card";
import { Card } from "./ui/card";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  const getYTicks = () => {
    const temps = chartData.flatMap((d) => [d.temp, d.feels_like]);
    const dataMin = Math.min(...temps);
    const dataMax = Math.max(...temps);

    const padding = 8;
    const yRange: [number, number] = [
      Math.floor(dataMin - padding),
      Math.ceil(dataMax + padding),
    ];

    const tickStep = Math.max(1, Math.ceil((yRange[1] - yRange[0]) / 4));
    const ticks: number[] = [];

    for (let t = yRange[0]; t <= yRange[1]; t += tickStep) ticks.push(t);

    return ticks;
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
                allowDataOverflow
                ticks={getYTicks()}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.7rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°C
                            </span>
                          </div>

                          <div className="flex flex-col">
                            <span className="text-[0.7rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°C
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
