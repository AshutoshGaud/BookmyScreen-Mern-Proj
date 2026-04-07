import express from 'express'; 
import * as UserController from './user.controller';
import { isVerfiedUser } from '../../middlewares/auth_middleware';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/me', isVerfiedUser , UserController.getUserById);
router.put('/activate/:id', isVerfiedUser, UserController.activateUser);

export default router;