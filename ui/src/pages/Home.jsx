import React from "reactn";
import { DateTimePicker } from "react-widgets";

const Home = () => {
  const getValue = v => console.log(v);
  return (
    <div>
      <h1>Home</h1>
      <div>
        <DateTimePicker />
      </div>
    </div>
  );
};

export default Home;
