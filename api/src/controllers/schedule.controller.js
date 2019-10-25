const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");
const Schedule = require("../models/Schedule");
const handleValidationErrors = require("../helpers/handleValidationErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = AsyncRouter();

const createValidators = [check("body").exists];

// List
router.get("/", async (req, res) => {
  const schedule = await Schedule.find({}).populate({
    path: "replies.user user"
  });

  res.send(schedule);
});

// Create
router.post(
  "/",
  [...createValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const schedule = new Schedule();
    schedule.task = req.body.task;
    schedule.date = req.body.date;
    schedule.user = req.user;

    await schedule.save();

    res.status(201).send(schedule);
  }
);

// create i think?
router.post(
  "/reply/:_id",
  [...createValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const schedule = await Schedule.findById(req.params._id);

    await schedule.save();

    res.status(201).send(await schedule.populate);
  }
);

// Delete
router.delete(
  "/:_id",
  [...createValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const schedule = await Schedule.findById(req.params._id);

    console.log(schedule);
    await schedule.remove();

    res.send(schedule);
  }
);

module.exports = router;
