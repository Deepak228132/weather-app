import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80"
  ); 
  const [error, setError] = useState("");

  const apiKey = "a105b475a5bcd33f9a3c9ddcaccc2516"; 

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
        setError("");

        
        const currentTime = new Date().getTime() / 1000;
        const isDay = currentTime >= data.sys.sunrise && currentTime <= data.sys.sunset;

        
        if (isDay) {
          setBgImage(
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80"
          );
        } else {
          setBgImage(
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80"
          );
        }
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div
      className="app"
      style={{
        background: `url(${bgImage}) no-repeat center center / cover`,
        transition: "background 1s ease",
      }}
    >
      <div className="weather-container">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="city-input"
        />
        <button onClick={fetchWeather} className="search-btn">
          Search
        </button>

        {error && <p className="error">{error}</p>}

        {weather && (
          <div className="weather-info">
            <div className="city">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temp">{weather.main.temp}°C</div>
            <div className="condition">{weather.weather[0].main}</div>
            <div className="day-night">
              {new Date().getTime() / 1000 >= weather.sys.sunrise &&
              new Date().getTime() / 1000 <= weather.sys.sunset
                ? "🌞 Day"
                : "🌜 Night"}
            </div>
          </div>
        )}
      </div>

      <footer className="footer">&copy; Deepak 2026</footer>
    </div>
  );
}

export default App;