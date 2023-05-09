import mongoose from "mongoose";

const COMMENT_SCHEMA = new mongoose.Schema(
  {
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
  },
  { collection: "comments" }
);

export const COMMENT_MODEL = mongoose.model("comments", COMMENT_SCHEMA);
