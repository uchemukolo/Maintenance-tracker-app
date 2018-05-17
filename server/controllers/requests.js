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
	getOne(req,res){
		for(let i=0; i < request.length; i++){
			if(request[i].requestId === parseInt(req.params.requestId, 10)){
				return res.json({
					message: 'Successful',
					request: db[i],
					error: false
				});
			}
		}
		return res.status(404).json({
			message: 'Request not found!',
			error: true
		});
		return this;
	}
	
}
const requestController = new Request();
export default requestController;
