import { Router } from 'express';
import {
  registerHandler,
  loginHandler,
  getMeHandler,
  logoutHandler,
} from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { validateRegister, validateLogin } from '../middlewares/validate.middleware';

const router = Router();

router.post('/register', validateRegister, registerHandler);
router.post('/login', validateLogin, loginHandler);
router.get('/me', protect, getMeHandler);
router.post('/logout', logoutHandler);

export default router;
