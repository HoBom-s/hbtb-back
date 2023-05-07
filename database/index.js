import mongoose from "mongoose";
import config from "../config";

/**
 * mongoose connection 함수 정의
 * App을 실행하자마자 MongoDB와 연결
 */
function initializeDataBase() {
  const mongoUrl = `mongodb+srv://${config.mongo.MONGO_HOST}:${config.mongo.MONGO_PASSWORD}@cluster0.cpsxc80.mongodb.net/?retryWrites=true&w=majority`;

  mongoose.connect(mongoUrl);

  const db = mongoose.connection;

  db.on("connected", () => {
    console.log(`The mongoDB ${config.mongo.MONGO_HOST} connected`);
  });

  db.on("error", () => {
    console.log(`The mongoDB ${config.mongo.MONGO_HOST} connection failed`);
  });
}

export default initializeDataBase;
