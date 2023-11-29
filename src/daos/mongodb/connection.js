import { connect } from "mongoose";
import "dotenv/config";

// try {
//   await connect(connectionString);
//   console.log("conectado a Mongo DB");
// } catch (error) {
//   console.log(error);

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_LOCAL_URL);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    console.log(error);
  }
};
