# 🌦️ Klimate - Modern Weather Application

A sleek, feature-rich weather application built with React, TypeScript, and modern web technologies. Get real-time weather updates, hourly forecasts, and manage your favorite cities with an intuitive, responsive interface.

![Klimate Weather App](public/logo-dark.png)

## 🚀 Live Demo

[View Live Demo](#) <!-- Add your deployed URL here -->


## 📸 Screenshots<img width="3886" height="2912" alt="localhost_5174_" src="https://github.com/user-attachments/assets/2b591f0e-88b9-4d87-8c02-e066423fea9f" />
<img width="3886" height="2912" alt="localhost_5174_ (1)" src="https://github.com/user-attachments/assets/2f1f45b8-11ae-470e-8047-1a61230102dd" />
<img width="3886" height="3232" alt="localhost_5174_ (2)" src="https://github.com/user-attachments/assets/04b2c9ad-f912-4389-a4f2-27900754b77c" />

## ✨ Features

### Core Features
- 🌡️ **Real-time Weather Data** - Current weather conditions with detailed metrics
- 📊 **Hourly Temperature Charts** - Visual temperature trends with Recharts
- 📅 **5-Day Forecast** - Extended weather predictions
- 🗺️ **Geolocation Support** - Automatic location detection
- ⭐ **Favorite Cities** - Save and manage multiple locations
- 🔍 **City Search** - Search any city worldwide with autocomplete
- 📜 **Search History** - Track your recent searches
- 🌓 **Dark/Light Mode** - Seamless theme switching

### Technical Highlights
- ⚡ **Optimized Performance** - React Query for intelligent caching and data fetching
- 🎨 **Modern UI/UX** - Built with Tailwind CSS and Radix UI components
- 📱 **Fully Responsive** - Mobile-first design approach
- 🔒 **Type-Safe** - Full TypeScript implementation
- 🎯 **Clean Architecture** - Separation of concerns with custom hooks
- 💾 **Local Storage** - Persistent user preferences and favorites

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React features and improvements
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **React Router v7** - Client-side routing

### UI & Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Recharts** - Composable charting library

### State Management & Data Fetching
- **TanStack Query (React Query)** - Powerful async state management
- **Custom Hooks** - Reusable logic for geolocation, favorites, search history

### API Integration
- **OpenWeatherMap API** - Weather data and geocoding services

## 📦 Project Structure

```
klimate/
├── src/
│   ├── api/              # API configuration and services
│   │   ├── config.ts     # API keys and endpoints
│   │   ├── types.ts      # TypeScript interfaces
│   │   └── weather.ts    # Weather API client
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   ├── context/      # Theme context provider
│   │   ├── city-search.tsx
│   │   ├── current-weather.tsx
│   │   ├── FavoriteCities.tsx
│   │   ├── Header.tsx
│   │   ├── hourly-temperature.tsx
│   │   ├── weather-details.tsx
│   │   ├── WeatherForecast.tsx
│   │   └── layout.tsx
│   ├── hooks/            # Custom React hooks
│   │   ├── use-favorite.tsx
│   │   ├── use-geolocation.tsx
│   │   ├── use-local-storage.ts
│   │   ├── use-search-history.ts
│   │   └── use-weather.ts
│   ├── pages/            # Page components
│   │   ├── city-page.tsx
│   │   └── weather-dashboard.tsx
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/klimate.git
   cd klimate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_OPEN_WEATHER_API_KEY=your_api_key_here
   ```
   
   Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Key Features Implementation

### 1. React Query Integration
Efficient data fetching with automatic caching, background updates, and stale-while-revalidate strategy:

```typescript
// Custom hooks with React Query
export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
```

### 2. Geolocation with Error Handling
User-friendly geolocation with proper error handling and permission management:

```typescript
// Handles browser geolocation with kCLErrorLocationUnknown
// Provides fallback options for denied permissions
```

### 3. Theme System
Persistent theme preferences with smooth transitions:

```typescript
// Dark/Light mode with localStorage persistence
// Uses next-themes for seamless theme switching
```

### 4. Responsive Charts
Dynamic temperature visualization with proper scaling:

```typescript
// Recharts with computed Y-axis domain
// Ensures all temperature values are visible
```

## 🎨 Design Decisions

### Performance Optimizations
- **React Query caching** - Reduces unnecessary API calls
- **Lazy loading** - Code splitting for better initial load
- **Optimistic updates** - Instant UI feedback for user actions
- **Memoization** - Prevents unnecessary re-renders

### User Experience
- **Progressive disclosure** - Information revealed as needed
- **Loading states** - Skeleton loaders for better perceived performance
- **Error boundaries** - Graceful error handling
- **Accessible** - ARIA labels and keyboard navigation

### Code Quality
- **TypeScript strict mode** - Catch errors at compile time
- **Custom hooks** - Reusable logic extraction
- **Component composition** - Small, focused components
- **Consistent naming** - Clear and predictable patterns

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style
- ESLint configuration for consistent code style
- TypeScript strict mode enabled
- Component-first architecture
- Custom hooks for business logic

## 🌐 API Usage

### OpenWeatherMap API Endpoints
- **Current Weather**: `/data/2.5/weather`
- **5-Day Forecast**: `/data/2.5/forecast`
- **Geocoding**: `/geo/1.0/direct`
- **Reverse Geocoding**: `/geo/1.0/reverse`

### API Rate Limits
- Free tier: 60 calls/minute
- Caching strategy reduces API calls significantly

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Portfolio: [yourportfolio.com](https://yourportfolio.com)

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for the weather API
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Recharts](https://recharts.org/) for beautiful charts

