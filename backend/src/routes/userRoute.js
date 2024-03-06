import { Router } from 'express'
import { getUserDetails } from '../controllers/userController.js';
import { authVerify } from '../middleware/verifyUser.js';

const router = Router();

router.get('/:userId', authVerify, getUserDetails)

export default router;