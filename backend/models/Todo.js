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
    creatorID: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { collection: "todos" }
);

export const TODO_MODEL = mongoose.model("todos", TODO_SCHEMA);
