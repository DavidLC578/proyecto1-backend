import express from 'express';
import { getUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/users/createUser', createUser);

export default router;
