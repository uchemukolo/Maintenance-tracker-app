import { Pool } from 'pg';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:asdflkj@localhost:5432/maindb';
const pool = new Pool({
  connectionString,
});
pool.connect();


/**
 *
 *@description - Class Definition for the Request class
 *
 * @export
 *
 * @class Request
 */
class Request {
  /**
    *@description - Create a request
    *
   *@param {object} req - HTTP request
   *
   * @param {object} res
   *
   * @return {object} this - Class instance
   *
   * @memberof Request
   */
/**
    *@description - Create a request
    *
   *@param {object} req - HTTP request
   *
   * @param {object} res
   *
   * @return {object} this - Class instance
   *
   * @memberof Request
   */
  createRequest(req, res) {
    const {
      title, category, description, urgencyLevel, status, completeStatus
    } = req.body;
    const decoded = jwt.verify(req.headers.token);
    const create = {
      text: 'INSERT INTO requests(title, category, description, urgencyLevel, status, completeStatus) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [title, category, description, urgencyLevel, status, completeStatus]
    };
    pool.query(create)
      .then((created) => {
        console.log(created);
        res.status(201).json({
          createdReq: {
            userId: decoded.id,
            status,
            title,
            description,
            urgencyLevel,
            completeStatus,
            message: 'Request created sucessfully'
          }
        });
        console.log('>>>>>>>>>>>');
        res.status(400).json({
          Message: 'Request Was Not Created!!!'
        });
      })
      .catch((err) => {
        console.log('MM<<>>>>>>>');

        res.status(500).json({
          message: 'Server Error',
          error: err.message
        });
      });
    return this;
  }

  // /**
  //   *@description - Fetch all the requests of a logged in user
  //   *
  //  *@param {object} req - HTTP request
  //  *
  //  * @param {object} res
  //  *
  //  * @return {object} this - Class instance
  //  *
  //  * @memberof Request
  //  */
  // getAll(req, res) {
  //   const text = 'SELECT * FROM requests WHERE user_id = $1';
  //   const values = [req.decode.id];

  //   client.query(text, values)
  //     .then((result) => {
  //       if (result.rows.length > 0) {
  //         return res.status(200).json({
  //           data: result.rows[0],
  //           message: 'Successful',
  //           error: false
  //         });
  //       }
  //       return res.status(404).json({
  //         message: 'No information',
  //         status: 'fail'
  //       });
  //     });

  //   return this;
  // }
  /**
  //   *@description - Get a the request of a logged in user
  //   *
  //  *@param {object} req - HTTP request
  //  *
  //  * @param {object} res
  //  *
  //  * @return {object} this - Class instance
  //  *
  //  * @memberof Request
  //  */
  // getOne(req, res) {
  //   const { requestId } = req.params;
  //   const text = 'SELECT * FROM requests WHERE id = $1 AND user_id = $2';
  //   const values = [requestId, req.decode.id];

  //   client.query(text, values)
  //     .then((result) => {
  //       if (result.rows[0]) {
  //         return res.status(200).json({
  //           data: result.rows,
  //           message: 'Successful',
  //           error: false
  //         });
  //       }
  //       return res.status(404).json({
  //         message: 'Request not found',
  //         status: 'fail'
  //       });
  //     });
  //   return this;
  // }
  // /**
  //   *@description - Create a request
  //   *
  //  *@param {object} req - HTTP request
  //  *
  //  * @param {object} res
  //  *
  //  * @return {object} this - Class instance
  //  *
  //  * @memberof Request
  //  */
  // createRequest(req, res) {
  //   const {
  //     title, category, description, urgencyLevel, status, completeStatus
  //   } = req.body;
  //   const decoded = jwt.decode(req.headers.token);
  //   const text = 'INSERT INTO requests(title, category, description, urgencyLevel, status, completeStatus) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  //   const values = [title, category, description, urgencyLevel, status, completeStatus];

  //   client.query(text, values);
  //   client.end()
  //     .then(() => {
  //       // console.log(newRequest);
  //       const newRequest = {
  //         userId: decoded.id,
  //         title,
  //         category,
  //         description,
  //         urgencyLevel,
  //         status,
  //         completeStatus
  //       };
  //       res.status(201).json({
  //         message: 'Request Added Successfully',
  //         newRequest
  //       });
  //     })
  //     .catch(() => res.status(500).json({
  //       message: 'Some error occured!'
  //     }));
  //   return this;
  // }

  // /**
  //  *@description - Modify details of a request
  //  *
  //  *@param {object} req - HTTP request
  //  *
  //  * @param {object} res
  //  *
  //  * @return {object} this - Class instance
  //  *
  //  * @memberof Request
  //  */
  // modifyRequest(req, res) {
  //   const decoded = jwt.decode(req.headers.token);
  //   const { requestId } = req.params;
  //   const { title, details } = req.body;

  //   const text = 'UPDATE requests SET title = $1, details = $2 WHERE id = $3 AND user_id = $4';
  //   const values = [title, details, requestId, req.decode.id];

  //   client.query(text, values)
  //     .then((updated) => {
  //       if (!updated) {
  //         return res.status(404).send({
  //           message: 'Request Not Found',
  //         });
  //       }
  //       return res.status(201).send({
  //         message: 'Update Successful',
  //         updated
  //       })
  //         .catch(() => res.status(500).send({
  //           message: 'Some error occured!'
  //         }));
  //     });
  //   return this;
  // }
}
export default Request;
