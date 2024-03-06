import { Router } from 'express'
import { loginUser, registerUser, logOutUser } from '../controllers/authController.js';
import { authVerify } from '../middleware/verifyUser.js';
import { loginValidation, registerValidation } from '../utils/validations.js';

const router = Router();

router.post('/register', registerValidation, registerUser)
router.post('/login', loginValidation, loginUser)
router.get('/logout/:userId', authVerify, logOutUser)
export default router;