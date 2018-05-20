import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Validate {
  /**
   *
   * @param {request} request
   *
   * @param {response} response
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static userId(request, response, next) {
    const { userId } = request.params;

    if (isNaN(userId)) {
      return response.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   * @param {request} request
   *
   * @param {response} response
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static requestId(request, response, next) {
    const { requestId } = request.params;

    if (isNaN(requestId)) {
      return response.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   *
   * @static
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
  static createRequest(request, response, next) {
    const {
      title, category, urgencyLevel, description, date
    } = request.body;

    const createData = {
      title, category, urgencyLevel, description, date
    };

    const createDataRules = {
      title: 'required|string|min:6',
      category: ['required', { in: ['Repair', 'Maintenance'] }],
      urgencyLevel: ['required', { in: ['High', 'Medium', 'Low'] }],
      description: 'required|string|min:10',
      date: 'required|date'
    };

    const validation = new Validator(createData, createDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400)
        .json({ message: errors });
    }
  }
}

export default Validate;
