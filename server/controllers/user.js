import { Client } from 'pg';
import bcrypt from 'bcrypt';
import Auth from '../middleware/Authenticate';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'maindb',
  password: 'asdflkj',
  port: 5432,
});
client.connect();

/**
 * @description - Class Definition for the User class
 *
 * @export
 *
 * @class Users
 */
class Users {
  /**
   * @description - signup a new user
   *
   * @param {object} req - HTTP request
   *
   * @param {object} res
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signUp(req, res) {
    const {
      username, firstName, lastName, email, password
    } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const text = 'INSERT INTO users(username, firstName, lastName, email, hashPassword) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [username, firstName, lastName, email, hashPassword];

    client.query(text, values)
      .then(() => {
        const newUser = {
          username,
          firstName,
          lastName,
          email
        };
        // console.log(newUser);
        const token = Auth.createToken(newUser);
        res.status(201).json({
          message: 'Signup Successful',
          newUser,
          token
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: 'Server Error'
        });
      });
    return this;
  }
}
const userController = new Users();
export default userController;
