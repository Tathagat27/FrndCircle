import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Router as userRoutes } from "./routes/userRoutes.js";
import cors from 'cors'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const connectDb = async () => {
    
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to DB");
    } catch (error) {
        console.log("Server is NOT connected to database", error.message);
    }
}

connectDb();

app.get("/", (req, res) => {
  res.send("From API :)");
});

app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on Port ${PORT}`));
