import express from 'express';
import {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

export const Router = express.Router();

Router.route("/").post(protect, accessChat);
Router.route("/").get(protect, fetchChats);
Router.route("/createGroup").post(protect, createGroupChat);
Router.route("/fetchGroups").get(protect, fetchGroups);
Router.route("/groupExit").put(protect, groupExit);
