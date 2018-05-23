import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Validate {
  /**
   *
   * @param {request} req
   *
   * @param {response} res
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static userId(req, res, next) {
    const { userId } = req.params;

    if (isNaN(userId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   * @param {request} req
   *
   * @param {response} res
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static requestId(req, res, next) {
    const { requestId } = req.params;

    if (isNaN(requestId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   * @static
   *
   * @param {object} req
   *
   * @param {object} res
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static signup(req, res, next) {
    const {
      username,
      firstName,
      lastName,
      email,
      password

    } = req.body;

    const userData = {
      username,
      firstName,
      lastName,
      email,
      password
    };

    const userDataRules = {
      username: 'required|string|min:5',
      firstName: 'required|string|alpha|min:2',
      lastName: 'required|string|alpha|min:2',
      email: 'required|string|email',
      password: 'required|min:6'
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   * @static
   * @param {object} req
   *
   * @param {object} res
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
   */
  static signin(req, res, next) {
    const {
      identifier,
      password
    } = req.body;

    const userData = {
      identifier,
      password
    };

    const userDataRules = {
      identifier: 'required|string',
      password: 'required|min:6',
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
  /**
   *
   *
   * @static
   * @param {object} req
   *
   * @param {object} res
   *
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
  static createRequest(req, res, next) {
    const {
      title, category, urgencyLevel, description, date
    } = req.body;

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
      return res.status(400)
        .json({ message: errors });
    }
  }
}

export default Validate;
