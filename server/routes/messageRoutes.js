import express from 'express';
import {
  allMessages,
  sendMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

export const Router = express.Router();

Router.route("/:chatId").get(protect, allMessages);
Router.route("/").post(protect, sendMessage);
