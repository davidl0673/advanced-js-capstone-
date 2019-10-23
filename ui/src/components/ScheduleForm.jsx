import React, { useState, useGlobal, useEffect } from "reactn";
import client from "../api/client";
import User from "../pages/User";
import "./Component.css";
import { DateTimePicker } from "react-widgets";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  }
});

const ScheduleForm = props => {
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const { 0: token } = useGlobal("token");
  const [date, setDate] = useState(new Date());
  const classes = useStyles();

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
            {/* <div>
              {tasks.map(task => (
                <div key={task._id}>
                  {task.task}
                  {moment(task.date).format("MM/DD/YYYY hh:mma")}
                </div>
              ))}
            </div> */}
          </div>
        </form>
        <h1 className="header1">Upcoming tasks</h1>
      </div>
      {/* {Object.keys(days).map(day => {
        const tasks = days[day];
        return (
          <div key={day} className="dayscard">
            <h2>{day}</h2>
            <div>
              {tasks.map(task => (
                <div key={tasks._id}>{task.task}</div>
              ))}
            </div>
          </div>
        );
      })} */}

      <div
        style={{
          display: "grid",
          margin: "50px",
          gridTemplateColumns: "repeat(7, 1fr)",
          gridGap: "2em"
        }}>
        {Object.keys(days).map(day => {
          const tasks = days[day];
          return (
            <Card
              key={day}
              className={classes.card}
              style={{ minHeight: "200px" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {day}
                  </Typography>

                  {tasks.map(task => (
                    <div key={tasks._id}>{task.task}</div>
                  ))}
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default ScheduleForm;

//i dont like the date storing  format all
