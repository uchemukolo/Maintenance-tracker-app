import express from 'express';
import Validate from '../middleware/validate';
import user from '../controllers/user';
import checkDetails from '../middleware/checks';
// import Auth from '../middleware/Authenticate';

const router = express.Router();


router.post('/', Validate.signup, checkDetails, user.signUp);
// router.post('/', Validate.createRequest, request.createRequest);


export default router;
