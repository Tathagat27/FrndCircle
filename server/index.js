import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Router as userRoutes } from "./routes/userRoutes.js";
import { Router as chatRoutes } from "./routes/chatRoutes.js";
import { Router as messageRoutes } from "./routes/messageRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import cors from 'cors';

import { Server } from 'socket.io';

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
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running on Port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("socket.io connection established")

  socket.on("setup", (user) => {
    socket.join(user.data._id);
    // console.log("joined user :", user.data._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User joined room: ", room);
  })

  socket.on("new message", (newMessageStatus) => {
    let chat = newMessageStatus.chat;
    console.log(newMessageStatus);
    if(!chat.users){
        return console.log(("chat.users not defined"));
    }
    chat.users.forEach((user) => {
        if(user._id === newMessageStatus.sender._id) return;

        socket.in(user._id).emit("message recieved", newMessageStatus);
    });
  })
});