import React from "react";
import ScheduleForm from "../components/ScheduleForm";

const Schedule = () => {
  return (
    <>
      <h1>weekly schedule </h1>
      <ScheduleForm />

      <div className="dayscard">
        <h2>Monday</h2>
        <li>placeholder text</li>
      </div>
      <div className="dayscard">
        <h2>Tuesday</h2>
        <li>placeholder text</li>
      </div>
      <div className="dayscard">
        <h2>Thursday</h2>
        <li>placeholder text</li>
      </div>
      <div className="dayscard">
        <h2>Friday</h2>
        <li>placeholder text</li>
      </div>
      <div className="dayscard">
        <h2>Saturday</h2>
        <li>placeholder text</li>
      </div>
      <div className="dayscard">
        <h2>Sunday</h2>
        <li>placeholder text</li>
      </div>
    </>
  );
};

export default Schedule;
