import { Client } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from '../middleware/Authenticate';

dotenv.config();
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
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
  /**
   * @description - signin an exiating user
   *
   * @param {object} req - HTTP request
   *
   * @param {object} res
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signIn(req, res) {
    const {
      username, password,
    } = req.body;

    const text = `SELECT * FROM users WHERE username = '${username}'`;

    client.query(text)
      .then((foundUser) => {
        if (!foundUser.rows[0]) {
          res.status(400).send({
            message: 'Incorrect Signin Credentials!'
          });
        } else if (bcrypt.compareSync(password, foundUser.rows[0].hashpassword)) {
          const user = {
            id: foundUser.id,
            role: foundUser.role,
            username: foundUser.username,
            email: foundUser.email
          };
          const token = jwt.sign(user, process.env.SECRET_KEY, {
            expiresIn: '1d'
          });
          console.log(token);
          return res.status(200).send({
            message: 'Signin Successful!',
            Token: token
          });
        } else {
          res.status(400).send({
            message: 'Incorrect Password'
          });
        }
      });
    return this;
  }
}
const userController = new Users();
export default userController;
