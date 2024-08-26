import mongoose from "mongoose";

import {
  DATABASE_ENDPOINT,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_TABLE,
} from "../environment";

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_ENDPOINT}/${DATABASE_TABLE}`,
    );
    console.info("database connection success");
  } catch (ex) {
    console.error(`database connection refused: ${ex}`);
    process.exit(1);
  }
};

export default connectDB;
