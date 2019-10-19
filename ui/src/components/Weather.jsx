import React, { useState, useEffect } from "reactn";
import axios from "axios";

// my api key is 0f7f8ff116a73f57df3ac2445e3faa60

const API_key = "0f7f8ff116a73f57df3ac2445e3faa60";

const GetWeather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?zip=97211&APPID=${API_key}&units=imperial`
      );
      console.log(response.data);
      setWeather(response.data);

      console.log(response.data.weather);
      // console.log(setWeather);
    };
    fetchWeather();
  }, []);
  return (
    <>
      <div>
        {weather && (
          <div>
            <h3>Current conditions in {weather.name}</h3>
            <div>{weather.weather[0].main}</div>
            <div>Current Temp: {Math.round(weather.main.temp)}&deg;</div>
          </div>
        )}
      </div>
    </>
  );
};

export default GetWeather;
