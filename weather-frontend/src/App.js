import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/weather?city=${city}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <h1>My Weather App</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="city">City: </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div className="weather-info">
          {weatherData.conditions && weatherData.conditions[0] && (
            <img 
              src={weatherData.conditions[0].icon} 
              alt="Weather icon"
              className="weather-icon"
            />
          )}
          <p>{weatherData.city}</p>
          {weatherData.conditions && weatherData.conditions[0] && (
            <p>{weatherData.conditions[0].description}</p>
          )}
          <p>{weatherData.temperature}°C</p>
        </div>
      )}
    </div>
  );
}

export default App;
