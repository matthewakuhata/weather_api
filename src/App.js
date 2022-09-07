import { useState } from "react";
import { getWeatherByLocation } from './api';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState('')

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      getWeatherByLocation(location).then(({ data, error }) => {
        if (error) {
          console.log(error.message);
          setError(error.message)
          setData('');
        } else {
          setData(data);
          setError('');
        }
      });
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">

        {data.name && <>
          <div className="top">
            <div className="location"><p>{data.name}</p></div>
            <div className="temp"><h1>{Math.round(data.main?.temp)}°C</h1></div>
            <div className="description" ><p>{data.weather?.map(weather => `${weather.description} `)}</p></div>
          </div>

          <div className="bottom">
            <div className="feels">
              <p className="bold">{Math.round(data.main?.feels_like)}°C</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main?.humidity}%</p>
              <p>Humidity</p></div>
            <div className="wind">
              <p className="bold">{Math.round(data.wind?.speed)} kph</p>
              <p>Wind Speed</p></div>
          </div>
        </>}
      </div>
    </div>
  );
}

export default App;
