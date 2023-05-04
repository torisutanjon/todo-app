import express from "express";
import { todoController } from "../controllers/index.js";
const router = express.Router();

router.post("/create-todo", todoController.createTodo);
router.post("/get-todos", todoController.getTodo);
router.post("/get-todos-details", todoController.getTodoDetails);

export default router;
