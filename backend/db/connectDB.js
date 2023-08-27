const mongoose = require("mongoose");
const MOGODB_URL =
  process.env.NODE_ENV === "development"
    ? process.env.MOGODB_URL_DEV
    : process.env.MOGODB_URL_PROD;
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MOGODB_URL);
    // console.log("Database connected!");
    console.log(`Database Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
