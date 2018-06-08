import express from 'express';
import Request from '../controllers/requests';
import Validate from '../middleware/validate';
import Auth from '../middleware/Authenticate';

const router = express.Router();
const requestController = new Request();

// router.get('/', request.getAll);
// router.get('/:requestId', request.getOne);
router.post('/', Auth.Verify, Validate.createrequest, requestController.createRequest);
// router.put('/:requestId', request.modifyRequest);


export default router;
