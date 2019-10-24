import React, { useState, useEffect } from "reactn";
import axios from "axios";
import fern2 from "../assets/fern2.jpg";

import "./Component.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 400
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

// my api key is 0f7f8ff116a73f57df3ac2445e3faa60

const API_key = "0f7f8ff116a73f57df3ac2445e3faa60";

const GetWeather = () => {
  const [weather, setWeather] = useState(null);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

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
    <div className="weather">
      <Card
        style={{
          color: "white",
          backgroundImage: `url(${fern2})`,
          backgroundSize: "contain"
        }}
        className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <div>
              {weather && (
                <div>
                  <h3>Current conditions in {weather.name}</h3>
                  <div>{weather.weather[0].main}</div>
                  <div>Current Temp: {Math.round(weather.main.temp)}&deg;</div>
                  <img
                    className="weathericon"
                    src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  />
                </div>
              )}
            </div>
          </Typography>

          <Typography variant="body2" component="p"></Typography>
        </CardContent>
      </Card>

      {/* <div>
        {weather && (
          <div>
            <h3>Current conditions in {weather.name}</h3>
            <div>{weather.weather[0].main}</div>
            <div>Current Temp: {Math.round(weather.main.temp)}&deg;</div>
            <img
              className="weathericon"
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            />
          </div>
        )}
      </div> */}
    </div>
  );
};

export default GetWeather;
