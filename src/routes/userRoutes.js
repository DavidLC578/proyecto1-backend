import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUsers, createUser, getCurrentUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/users/createUser', createUser);
router.get("/profile", authMiddleware, getCurrentUser);


export default router;
