const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const shoppinglistSchema = {
  item: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  }
};

const ShoppingList = mongoose.model("ShoppingList", shoppinglistSchema);

module.exports = ShoppingList;
