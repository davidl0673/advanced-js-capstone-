const { AsyncRouter } = require("express-async-router");
const { check, validationResult } = require("express-validator");
const ShoppingList = require("../models/Shoppinglist");
const handleValidationErrors = require("../helpers/handleValidationErrors");
const jwtMiddleware = require("../helpers/jwtMiddleware");

const router = AsyncRouter();

const createValidators = [check("body").exists];

// List
router.get("/", async (req, res) => {
  const shoppinglist = await ShoppingList.find({}).populate({
    path: "replies.user user"
  });

  res.send(shoppinglist);
  // console.log(shoppinglist);
});

// Create
router.post(
  "/",
  [...createValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const shoppinglist = new ShoppingList();
    shoppinglist.item = req.body.item;
    shoppinglist.user = req.user;

    await shoppinglist.save();

    res.status(201).send(shoppinglist);
  }
);

// create i think?
router.post(
  "/reply/:_id",
  [...createValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const shoppinglist = await ShoppingList.findById(req.params._id);
    shoppinglist.user = req.user._id;
    await shoppinglist.save();

    res.status(201).send(await shoppinglist.populate);
  }
);

//Update

router.patch("/:_id", [jwtMiddleware], async (req, res) => {
  const { _id } = req.params;
  const shoppinglist = await ShoppingList.findOne({ _id });

  if (!shoppinglist) return res.sendStatus(404);
  if (!req.user._id.equals(shoppinglist.user._id)) return res.sendStatus(401);

  console.log(req.user._id);
  console.log(shoppinglist.user._id);
  shoppinglist.set(req.body);
  await shoppinglist.save();

  res.send("sup");
});

// Delete
router.delete(
  "/:_id",
  [...createValidators, jwtMiddleware, handleValidationErrors],
  async (req, res) => {
    const shoppinglist = await ShoppingList.findById(req.params._id);

    await shoppinglist.remove();

    res.send(shoppinglist);
  }
);

module.exports = router;
