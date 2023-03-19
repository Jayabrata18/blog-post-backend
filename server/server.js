const http = require("http");
const express = require("express");
const app = express();
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const path = require("path");
// const cors = require("cors");
// require("dotenv").config();

//rotes
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");

// Port Environment variable
const PORT = process.env.PORT || 5000;

//connection to database
connectDB();

//middleware
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/blog/posts", postRoute);
app.use("/api/auth", authRoute);
// Creating the node server
app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
