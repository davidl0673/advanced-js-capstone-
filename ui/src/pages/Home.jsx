import React from "reactn";
import { Jumbotron } from "react-bootstrap";
import farm from "../assets/farm.jpg";

import "../App.css";

const Home = () => {
  return (
    <>
      {/* <Jumbotron className="jumbofun">
      </Jumbotron> */}
      <div className="farm">
        <h1>welcome to myfarm assistant</h1>
        <p>hopfully this helps in some way </p>
        
        <img src={farm} alt="" />
      </div>
    </>
  );
};

export default Home;
