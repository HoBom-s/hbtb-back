import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import initializeDataBase from "./database";

dotenv.config();

initializeDataBase();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.listen(8081, () => {
  console.log("The HBTB BackEnd Node Express server is listening");
});
