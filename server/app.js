import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import request from './routes/request';
import user from './routes/user';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users/requests', request);
app.use('/api/v1/auth/signup', user);

app.get('', (req, res) => res.status(200).json({
  message: 'Welcome To Maintenance Tracker API!!!',
}));

export default app;
