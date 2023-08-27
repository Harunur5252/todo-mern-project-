const express = require("express");
require("dotenv").config();
// const cors = require("cors");
const path = require("path");
const connectDB = require("./db/connectDB");
const authRoute = require("./route/authRoute");
const todosRoute = require("./route/todosRoute");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// cookie parsing
app.use(cookieParser());

// connect with mongoDB
connectDB();

// main routes
app.use("/api/auth", authRoute);
app.use("/api/todos", todosRoute);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("api is running ..."));
}

// error handling..
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
