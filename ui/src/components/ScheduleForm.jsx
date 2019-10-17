import React, { useState, useGlobal, useEffect } from "reactn";
import client from "../api/client";
import User from "../pages/User";
import "./Component.css";
import { DateTimePicker } from "react-widgets";
import moment from "moment";

const ScheduleForm = props => {
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const { 0: token } = useGlobal("token");
  const [date, setDate] = useState(new Date());

  const handleDateChange = _date => {
    console.log(_date);
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
    </>
  );
};

export default ScheduleForm;

//no idea how to handle putting the date together with the schedule
