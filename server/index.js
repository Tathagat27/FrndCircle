const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

const app = express();
dotenv.config();


const connectDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is connected to DB");
}

connectDb();

app.get("/", (req, res) => {
  res.send("From API :)");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
