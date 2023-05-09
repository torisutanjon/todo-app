import express from "express";
import { commentController } from "../controllers/index.js";

const router = express.Router();

router.post("/get-comment", commentController.getComment);
router.post("/add-comment", commentController.addComments);
router.post("/update-comment", commentController.updateComment);
router.post("/delete-comment", commentController.deleteComment);

export default router;
