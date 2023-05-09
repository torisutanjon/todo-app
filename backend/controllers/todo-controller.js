import { TODO_MODEL } from "../models/Todo.js";
import { USER_ACCOUNT_MODEL } from "../models/Account.js";
import { COMMENT_MODEL } from "../models/Comment.js";

export default {
  createTodo: async (req, res) => {
    try {
      const user = await USER_ACCOUNT_MODEL.findOne({
        _id: req.body.userid,
      });

      if (!user) return res.status(404).send({ message: "No user found" });

      const todo = await TODO_MODEL.create({
        title: req.body.title,
        body: req.body.body,
        creatorID: req.body.userid,
        creatorName: req.body.username,
      });

      user.todos.push(todo._id);
      user.save();

      return res.status(200).send({ message: "Todo Created" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  getTodo: async (req, res) => {
    try {
      const todos = await TODO_MODEL.find({});

      if (!todos) return;

      return res.status(200).send({ todos: todos });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  getTodoDetails: async (req, res) => {
    try {
      const user = await USER_ACCOUNT_MODEL.findOne({
        _id: req.body.creator,
      });

      if (!user) return res.status(404).send({ message: "No user found" });

      //check if todo belongs to the user
      const todo = user.todos.find((todo) => {
        return todo.toString() === req.body.id;
      });

      if (todo === undefined)
        return res.status(404).send({ message: "Error on finding the todo" });

      const todoDetails = await TODO_MODEL.findOne({
        _id: todo,
      });

      if (!todoDetails)
        return res
          .status(404)
          .send({ message: "Error on finding the todo info" });

      return res.status(200).send({ todo: todoDetails });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  updateTodo: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findOne({
        _id: req.body.todoId,
      });

      if (!todo) return res.status(404).send({ message: "No todo file found" });

      todo.title = req.body.title;
      todo.body = req.body.body;

      todo.save();

      return res.status(200).send({ message: "Todo was updated" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const todo = await TODO_MODEL.findOne({
        _id: req.body.todoID,
      });

      await Promise.all(
        todo.comments.map(async (commendID) => {
          await COMMENT_MODEL.findOneAndDelete({
            _id: commendID,
          });
        })
      );

      const deletedDoc = await TODO_MODEL.findOneAndDelete({
        _id: req.body.todoID,
      });

      if (!deletedDoc)
        return res.status(500).send({ message: "Error on deleting file" });

      return res.status(200).send({ message: "Todo file delete" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  },
};
