import React, { useState, useGlobal, useEffect } from "reactn";
import client from "../api/client";
import User from "../pages/User";
import "./Component.css";
import { DateTimePicker } from "react-widgets";
import moment from "moment";
import { number } from "prop-types";

const ScheduleForm = props => {
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const { 0: token } = useGlobal("token");
  const [date, setDate] = useState(new Date());

  const handleDateChange = _date => {
    setDate(_date);
  };

  const postSchedule = async e => {
    e.preventDefault();
    const { data } = await client.post(
      "/schedule",
      {
        task: body,
        date: date
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setBody("");
    setTasks([...tasks, data]);
    if (props.onSuccess) props.onSuccess(data);
  };

  const getTasks = async () => {
    const { data } = await client.get("/schedule/");
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const days = {};

  if (tasks) {
    tasks.forEach(task => {
      // const day = moment(task.date).format("MM/d/YYYY");
      const day = moment(task.date).format("LLLL");
      if (days[day]) {
        days[day].push(task);
      } else {
        days[day] = [task];
      }
    });
  }

  return (
    <>
      <div className="card2">
        <DateTimePicker onChange={handleDateChange} />
      </div>

      <div className="card2">
        <form onSubmit={postSchedule}>
          <div>
            <input
              type="text"
              placeholder="add a task"
              onChange={e => setBody(e.target.value)}
              value={body}
            />
          </div>
          <div>
            <button>Post</button>
            <div>
              {tasks.map(task => (
                <div key={task._id}>
                  {task.task}
                  {moment(task.date).format("MM/DD/YYYY hh:mma")}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
      {Object.keys(days).map(day => {
        const tasks = days[day];
        return (
          <div className="dayscard">
            <h2>{day}</h2>
            <div>{JSON.stringify(tasks)}</div>
          </div>
        );
      })}
      {/* <div className="dayscard">
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
      </div> */}
    </>
  );
};

export default ScheduleForm;

//i dont like the date storing  format all
