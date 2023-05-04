import mongoose from "mongoose";

const USER_ACCOUNT_SCHEMA = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: false,
      default: [],
    },
  },
  { collection: "useraccounts" }
);

export const USER_ACCOUNT_MODEL = mongoose.model(
  "useraccounts",
  USER_ACCOUNT_SCHEMA
);
