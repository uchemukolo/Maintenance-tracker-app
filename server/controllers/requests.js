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
		/**
	 *@description - Get a the request of a logged in user
 	 *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} this - Class instance
   *
   * @memberof Request
   */
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
		/**
	 *@description - Create a request
 	 *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} this - Class instance
   *
   * @memberof Request
   */
	add(req, res) {
		const {title, category, description, urgencyLevel, date } = req.body;
		if (!title) {
			res.status(400).json({
				message: 'Please Add The Title of Your Request!'
			})
		} else if (!category) {
			res.status(400).json({
				message: 'Please Add a Category!'
			})
		} else if (!description) {
			res.status(400).json({
				message: 'Please Add Description!'
			})
		} else if (!urgencyLevel) {
			res.status(400).json({
				message: 'Please Select Urgency Level!'
			})
		} else {
			db.push(req.body);
			return res.status(201).json({
				message: 'Request Created Successfully',
				request: db,
				error: false
			});
			return this;
		}
}
}
const requestController = new Request();
export default requestController;
