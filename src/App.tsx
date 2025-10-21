import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "@/components/layout";

import CityPage from "./pages/city-page";
import WeatherDashboard from "./pages/weather-dashboard";
import { ThemeProvider } from "./components/context/theme-provider";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes - cache time
        getTime: 10 * 60 * 1000, // 10 minutes - garbage collection
        retry: false,
        refetchOnWindowFocus: false
      }
    }
  });
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  return (
    <ThemeProvider defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<WeatherDashboard />} />
              <Route path="city/:cityName" element={<CityPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;