import mongoose from "mongoose";

const TODO_SCHEMA = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  { collection: "todos" }
);

export const TODO_MODEL = mongoose.model("todos", TODO_SCHEMA);
