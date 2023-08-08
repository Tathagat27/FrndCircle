import express from 'express';
import { loginController, signupController, fetchAllUsersController } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

export const Router = express.Router();

Router.post('/login', loginController);
Router.post('/signup', signupController);
Router.post('/fetchUsers', protect, fetchAllUsersController);
