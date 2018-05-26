import express from 'express';
import Validate from '../middleware/validate';
import User from '../controllers/user';

const router = express.Router();

const userController = new User();

router.post('/signup', Validate.signup, userController.signUp);
router.post('/login', Validate.signin, userController.signIn);


export default router;
