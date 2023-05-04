import { TODO_MODEL } from "../models/Todo.js";
import { USER_ACCOUNT_MODEL } from "../models/Account.js";
export default {
  createTodo: async (req, res) => {
    try {
      const user = await USER_ACCOUNT_MODEL.findOne({
        _id: req.body.userid,
      });

      if (!user) return res.status(404).send({ message: "No user found" });

      const todo = await TODO_MODEL.create({
        title: req.body.title,
        body: req.body.title,
        creator: req.body.userid,
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
      const todos = [];

      const user = await USER_ACCOUNT_MODEL.findOne({
        _id: req.body.userID,
      });

      if (!user) return res.status(404).send({ message: "No user found" });

      if (user.todos !== null) {
        await Promise.all(
          user.todos.map(async (todo) => {
            const todoRes = await TODO_MODEL.findOne({
              _id: todo,
            });

            if (!todoRes) return;
            todos.push(todoRes);
          })
        );
      }

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
};
