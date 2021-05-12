const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv/config");

const postRoute = require("./routes/posts");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Setting and connecting DATABASE
const DATABASE_URI = process.env.MONGO_URI;
const db = mongoose;
db.connect(
  DATABASE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Success connect to Data Base");
  }
);

// Basic Routes
app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes using midlleware style
app.use("/posts", postRoute);

// Setting up port and server
port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`);
});
