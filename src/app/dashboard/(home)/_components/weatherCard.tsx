// src/components/WeatherCard.tsx
"use client";

import { useEffect, useState } from "react";

interface CachedWeather {
  timestamp: number;
  data: {
    temp: number;
    condition: string;
    humidity: number;
    wind: number;
    iconCode: string;
    locationName: string;
  };
}

interface Weather {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  iconCode: string;
  locationName: string;
}

const CACHE_KEY = "weather_cache";
// Cache TTL = 1 hour
const CACHE_TTL = 1000 * 60 * 60;

export default function WeatherCard() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherByCoords(lat: number, lon: number) {
      try {
        // 1) Check localStorage cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CachedWeather = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setWeather(parsed.data);
            setLoading(false);
            return;
          }
        }

        // 2) Fetch from OpenWeatherMap
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY; 
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (!res.ok) throw new Error("OpenWeatherMap API error");

        const data = await res.json();
        const transformed: Weather = {
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          iconCode: data.weather[0].icon, // e.g. "01d"
          locationName: data.name,
        };

        // 3) Save to state and cache in localStorage
        setWeather(transformed);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: transformed })
        );
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        setLoading(false);
      }
    }

    async function loadLocationAndWeather() {
      try {
        // 1) Check cache without re‐fetching IP
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed: CachedWeather = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            setWeather(parsed.data);
            setLoading(false);
            return;
          }
        }

        // 2) Fetch user IP location (latitude & longitude) via ipapi.co
        const ipRes = await fetch("https://ipapi.co/json");
        console.log("Fetching IP location from:", ipRes);
        if (!ipRes.ok) throw new Error("IP geolocation error");
        const ipData = await ipRes.json();
        const { latitude, longitude } = ipData;
        if (typeof latitude !== "number" || typeof longitude !== "number") {
          throw new Error("Invalid latitude/longitude from IPAPI");
        }

        // 3) Fetch weather using those coords
        await fetchWeatherByCoords(latitude, longitude);
      } catch (err) {
        console.error("Location fetch error:", err);
        setLocationError("Could not determine location via IP.");
        setLoading(false);
      }
    }

    loadLocationAndWeather();
  }, []);

  // ─── Loading State (gradient shimmer, no background image) ─────────────────
  if (loading) {
    return (
      <div
        className="
          relative mb-8 overflow-hidden rounded-xl 
          bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 
          animate-pulse p-6 shadow-lg
        "
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-56 flex-col justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 rounded bg-gray-300 dark:bg-gray-600" />
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600" />
          </div>
          <div className="flex items-center space-x-6">
            <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="space-y-2 flex-1">
              <div className="h-5 w-32 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600" />
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Location Error State ──────────────────────────────────────────────────
  if (locationError) {
    return (
      <div
        className="relative mb-8 overflow-hidden rounded-xl bg-cover bg-center p-6 text-white shadow-lg"
        style={{ backgroundImage: "url('/images/weather.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-56 flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-bold text-red-400">
            Unable to fetch location
          </h2>
          <p className="text-sm opacity-80">{locationError}</p>
        </div>
      </div>
    );
  }

  // ─── Weather Fetch Failed (no data) ────────────────────────────────────────
  if (!weather) {
    return (
      <div
        className="relative mb-8 overflow-hidden rounded-xl bg-cover bg-center p-6 text-white shadow-lg"
        style={{ backgroundImage: "url('/images/weather.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-56 flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-bold text-red-400">
            Oops! Couldn't load weather.
          </h2>
          <p className="text-sm opacity-80">
            Please check your network or try again later.
          </p>
        </div>
      </div>
    );
  }

  // ─── Normal State (weather data is ready) ─────────────────────────────────
  return (
    <div
      className="relative mb-8 overflow-hidden rounded-xl bg-cover bg-center p-6 text-white shadow-lg"
      style={{ backgroundImage: "url('/images/weather.jpg')" }}
    >
      {/* Dark overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex h-56 flex-col justify-between">
        {/* ── Top Row: Title + Icon ─────────────────────────────────────────────── */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">Today’s Weather</h2>
            <p className="text-base opacity-80">📍 {weather.locationName}</p>
          </div>

          {/* Icon in the top‐right corner */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/30">
            <img
              src={`https://openweathermap.org/img/wn/${weather.iconCode}@2x.png`}
              alt={weather.condition}
              className="h-10 w-10"
            />
          </div>
        </div>

        {/* ── Bottom Row: Temperature & Details ───────────────────────────────── */}
        <div className="flex items-end justify-between">
          {/* Left: Big Temperature + Condition */}
          <div>
            <div className="text-6xl font-extrabold leading-none">
              {weather.temp}°C
            </div>
            <p className="text-lg font-semibold">{weather.condition}</p>
          </div>

          {/* Right: Humidity & Wind */}
          <div className="space-y-1 text-right">
            <p className="text-sm opacity-80">Humidity: {weather.humidity}%</p>
            <p className="text-sm opacity-80">Wind: {weather.wind} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}
