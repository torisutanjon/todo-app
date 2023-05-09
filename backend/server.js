import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conn } from "./config/db_config.js";
import { accountRoutes, todoRoutes, commentRoutes } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", accountRoutes);
app.use("/todo", todoRoutes);
app.use("/comment", commentRoutes);

app.listen(PORT, (err) => {
  if (err)
    return console.log(`Unable to connect to port: ${PORT} with error: ${err}`);
  console.log(`Connected to PORT: ${5000}`);
  conn();
});
