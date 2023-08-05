const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = express();
dotenv.config();

console.log(mongoose.connect(process.env.MONGO_URI));

app.get("/", (req, res) => {
  res.send("From API :)");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
