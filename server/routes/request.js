import express from 'express';
import request from '../controllers/requests';
import Validate from '../middleware/validate';
import Auth from '../middleware/Authenticate';

const router = express.Router();

// router.get('/', request.getAll);
// router.get('/:requestId', request.getOne);
router.post('/', Auth.Verify, Validate.createRequest, request.createRequest);
// router.put('/:requestId', request.modifyRequest);


export default router;
