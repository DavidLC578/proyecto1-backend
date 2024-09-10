import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getUsers, createUser, getCurrentUser, uploadProfilePic } from '../controllers/userController.js';

const router = express.Router();

router.post('/users/createUser', createUser);
router.get("/users/profile", authMiddleware, getCurrentUser);
router.post("/users/uploadProfilePic", uploadProfilePic)

export default router;
