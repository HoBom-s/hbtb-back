import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import initializeDataBase from "./database";
import tagRouter from "./src/routes/tag.router";
import categoryRouter from "./src/routes/category.router";
import { swaggerUi, specs } from "./docs";

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

app.use("/tag", tagRouter);
app.use("/category", categoryRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(8081, () => {
  console.log("The HBTB BackEnd Node Express server is listening");
});
