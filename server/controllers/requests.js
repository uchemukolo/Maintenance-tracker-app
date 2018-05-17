import db from '../db/request.js';

const request = db;
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
 *@description - Fetch all the requests of a logged in user
 *
 *@param {object} request - HTTP request
 *
 * @param {object} response
 *
 * @return {object} this - Class instance
 *
 * @memberof Request
 */
	getAll (req,res){
		return res.status(200).json({
			message: 'Successful',
			request: db,
			error: false
		});
	return this;
}
}
const requestController = new Request();
export default requestController;
