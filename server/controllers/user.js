import { Pool } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from '../middleware/Authenticate';

dotenv.config();
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:asdflkj@localhost:5432/maindb';
const pool = new Pool({
  connectionString,
});
pool.connect();

/**
 * @description - Class Definition for the User class
 *
 * @export
 *
 * @class User
 *
 * @class Users
 */
class Users {
  /**
   * @description - signup a new user
   *
   * @param {object} req - HTTP requestuest
   *
   * @param {object} res
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signUp(req, res) {
    const {
      firstName,
      lastName,
      email,
      username,
      password

    } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const find = {
      text: 'SELECT username, email FROM users WHERE username = $1 OR email = $2',
      values: [username, email]
    };
    const create = {
      text: 'INSERT INTO users(username, firstName, lastName, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [username, firstName, lastName, email, hashPassword]
    };

    const errors = {};

    pool.query(find)
      .then((foundUser) => {
        if (foundUser.rows[0]) {
          if (foundUser.email === email) {
            errors.email = 'Email is already in use';
          }
          if (foundUser.username === username.trim()) {
            errors.username = 'Username already taken';
          }

          return res.status(409).json({
            errors: 'User Already Exists, Please Login'
          });
        }
        pool.query(create)
          .then(() => {
            const newUser = {
              firstName,
              lastName,
              username,
              email,
              password: hashPassword
            };
            console.log(newUser);
            const token = Auth.createToken(create);

            res.status(201).json({
              message: 'Signup succesfull',
              newUser,
              token
            });
          });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Server Error',
          error: err.message
        });
      });

    return this;
  }

  /**
   * @description - Login in a user.
   *
   * @param {object} req - HTTP requestuest
   *
   * @param {object} res - HTTP response
   *
   * @return {object} this - Class instance
   *
   * @memberof Users
   */
  signIn(req, res) {
    const { username, password } = req.body;

    const text = `SELECT * FROM users WHERE username = '${username}'`;

    pool.query(text)
      .then((found) => {
        console.log(found, '>>>>>>>>>.');
        if (!found.rows[0]) {
          return res.status(400).json({
            message: 'Invalid Username or Password!'
          });
        } else if (bcrypt.compareSync(password, found.rows[0].password)) {
          const userDetails = {
            id: found.id,
            username: found.username,
            email: found.email,
            role: found.role
          };
          console.log(userDetails);
          const token = jwt.sign(userDetails, process.env.SECRET_KEY, {
            expiresIn: '1d'
          });
          return res.status(200).json({
            message: 'Login Successful!',
            userDetails,
            token
          });
        }
        return res.status(400).json({
          message: 'Incorrect Password!'
        })
          .catch((err) => {
            res.status(500).json({
              message: 'Server Error',
              error: err.message
            });
          });
      });
    return this;
  }
}
export default Users;
