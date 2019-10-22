import React from "reactn";
import farm from "../assets/farm.jpg";

import "../App.css";
import GetWeather from "../components/Weather";

const Home = () => {
  return (
    <>
      <GetWeather />
      <div className="farm">
        <h1>welcome to myfarm assistant</h1>
        <p>hopfully this helps in some way </p>

        <img src={farm} alt="" />

        <div> heres some things that this appication can do for you !!</div>
      </div>
    </>
  );
};

export default Home;
