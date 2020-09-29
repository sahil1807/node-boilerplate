const { models } = require('../../../loaders/sequelize');
const Logger = require('../../../config/Logger');
const { Response } = require('../../../utils');

class UserController {
  static async getAll(req, res) {
    Logger.log('info', 'Fetching user data');

    const userRecord = await models.user.findAll();

    Response.success(res, 'success', userRecord);
  }

  static async uploadUser(req, res) {
    Logger.log('info', 'sample file upload api');

    Response.success(res, 'success', req.body);
  }
}

module.exports = UserController;
