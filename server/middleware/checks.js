import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'maindb',
  password: 'asdflkj',
  port: 5432,
});
client.connect();

const checkDetails = (req, res, next) => {
  const {
    username, email,
  } = req.body;

  const query = {
    text: 'SELECT username, email FROM users WHERE username = $1 OR email = $2',
    values: [username, email]
  };
  client.query(query, (err, result) => {
    client.end();
    if (result.rows[0]) {
      return res.status(400).json({
        message: 'username or email already Exists!',
        err: true
      });
    }
    return next();
  });
};
export default checkDetails;
