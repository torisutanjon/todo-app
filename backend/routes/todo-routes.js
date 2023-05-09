import express from "express";
import { todoController } from "../controllers/index.js";
const router = express.Router();

router.post("/create-todo", todoController.createTodo);
router.post("/get-todos", todoController.getTodo);
router.post("/get-todos-details", todoController.getTodoDetails);
router.post("/update-todo", todoController.updateTodo);
router.post("/delete-todo", todoController.deleteTodo);

export default router;
