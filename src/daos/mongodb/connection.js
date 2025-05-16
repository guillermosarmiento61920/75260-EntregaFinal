// connection.js
import { connect } from "mongoose";
import "dotenv/config";

export const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
  console.log("conectado correctamente a MongoDB!");
  } catch (error) {
    throw new Error(error);
  }
};

