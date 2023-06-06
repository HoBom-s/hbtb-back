import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import initializeDataBase from "./database";
import tagRouter from "./src/routes/tag.router";
import categoryRouter from "./src/routes/category.router";
import errorMiddleware from "./src/middlewares/error.middleware";
import articleRouter from "./src/routes/article.router";
import userRouter from "./src/routes/user.router";
import { swaggerUi, specs } from "./docs";

dotenv.config();

initializeDataBase();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.use("/tag", tagRouter);
app.use("/category", categoryRouter);
app.use("/article", articleRouter);
app.use("/user", userRouter);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(errorMiddleware);

app.listen(8081, () => {
  console.log("The HBTB BackEnd Node Express server is listening");
});

export default app;
