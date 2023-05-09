import { TODO_MODEL } from "../models/Todo.js";
import { COMMENT_MODEL } from "../models/Comment.js";

export default {
  getComment: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findOne({
        _id: req.body.todoID,
      });

      if (!todo)
        return res.status(404).send({ message: "Error fetching todo data" });

      const comments = await Promise.all(
        todo.comments.map(async (commentID) => {
          const comment = await COMMENT_MODEL.findOne({
            _id: commentID,
          });

          if (!comment) return;

          return comment;
        })
      );

      return res.status(200).send({ comments: comments });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  addComments: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findOne({
        _id: req.body.todoID,
      });

      if (!todo)
        return res.status(404).send({ message: "Error fetching todo data" });

      const comment = await COMMENT_MODEL.create({
        body: req.body.comment,
        creatorID: req.body.creatorID,
        creatorName: req.body.creatorName,
      });

      todo.comments.push(comment._id);
      todo.save();

      return res.status(201).send({ message: "Comment Added" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  updateComment: async (req, res) => {
    try {
      const comment = await COMMENT_MODEL.findOne({
        _id: req.body.commentid,
      });

      if (!comment)
        return res.status(404).send({ message: "Error fetching comment data" });

      comment.body = req.body.value;
      comment.save();

      return res.status(200).send({ message: "Comment Updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findOne({
        _id: req.body.todoid,
      });

      const commentIndex = todo.comments.indexOf(req.body.commentid);

      todo.comments.splice(commentIndex, 1);
      todo.save();

      const deletedComment = await COMMENT_MODEL.findOneAndDelete({
        _id: req.body.commentid,
      });

      if (!deletedComment)
        return res.status(500).send({ message: "Error deleting the comment" });

      return res.status(200).send({ message: "Comment Deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
