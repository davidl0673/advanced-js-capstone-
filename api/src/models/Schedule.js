const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const scheduleSchema = Schema(
  {
    date: {
      type: Date,
      required: true
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    task: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
