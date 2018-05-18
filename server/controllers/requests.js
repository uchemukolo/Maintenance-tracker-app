import requests from '../db/request.js';

const request = requests;
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
			request: requests,
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
					request: requests[i],
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
		const {title, category, description, urgencyLevel} = req.body;
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
			requests.push(req.body);
			return res.status(201).json({
				message: 'Request Created Successfully',
				request: requests,
				error: false
			});
			return this;
		}
}
/**
   *@description - Modify details of a request
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} this - Class instance
   *
   * @memberof Request
   */
	modify (req,res){
		for(let i=0; i < request.length; i++){
			if(request[i].requestId === parseInt(req.params.requestId, 10)){
				request[i].title = req.body.title;
				request[i].category = req.body.category;
				request[i].description = req.body.description;
				request[i].urgencyLevel = req.body.urgencyLevel;
				return res.json({
					message: 'Update Successful',
					request: requests,
					error: false
				});
			}
			return res.status(404).json({
				message: 'Request not found',
				error: true
			});
			return this;
		}
	}
}
const requestController = new Request();
export default requestController;
