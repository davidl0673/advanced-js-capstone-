import React, { useState, useGlobal, useEffect } from "reactn";
import client from "../api/client";

const ScheduleForm = props => {
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const { 0: token } = useGlobal("token");

  // get the shopping list using useEffect
  const postSchedule = async e => {
    e.preventDefault();

    const { data } = await client.post(
      "/schedule",
      {
        task: body
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setBody("");

    setTasks([...tasks, data]);
    // Add the new shopping list item to your local state

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
              <div key={task._id}>{task.task}</div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default ScheduleForm;
