import Joi from "joi";
import dotenv from "dotenv";

const configSchema = Joi.object({
  SERVER_PORT: Joi.number().default(8081),
  MONGO_HOST: Joi.string().required().description("MongoDB HOST URL"),
  MONGO_PASSWORD: Joi.string().required().description("MongoDB PASSWORD"),
})
  .unknown()
  .required();

dotenv.config();

const { error } = configSchema.validate(process.env);

if (error)
  throw new Error(`Config Server & MongoDB setting error: ${error.message}`);

const config = {
  server: {
    SERVER_PORT: Number.parseInt(process.env.SERVER_PORT),
  },
  mongo: {
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  },
};

Object.freeze(config);
export default config;
