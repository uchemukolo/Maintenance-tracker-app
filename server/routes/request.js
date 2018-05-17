import express from 'express';
import bodyParser from 'body-parser';
import request from '../controllers/requests';

const router = express.Router();

router.get('/', request.getAll);
router.get('/:requestId', request.getOne);
router.post('/', request.add);


export default router;