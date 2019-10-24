const mongoose = require("mongoose");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const shoppinglistSchema = Schema(
  {
    item: {
      type: String,
      required: true
    },
    user: {
      type: ObjectId,
      ref: "User"
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const ShoppingList = mongoose.model("ShoppingList", shoppinglistSchema);

module.exports = ShoppingList;
