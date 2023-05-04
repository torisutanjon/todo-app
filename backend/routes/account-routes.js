import express from "express";
import { accountController } from "../controllers/index.js";

const router = express.Router();

router.post("/create-account", accountController.createAccount);
router.post("/login-account", accountController.loginAccount);

export default router;
