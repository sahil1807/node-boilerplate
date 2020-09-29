const HttpStatus = require('http-status-codes');
const UserModel = require('../../models/User');
const Logger = require('../../config/Logger');
const { Response } = require('../../utils');

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const AttachCurrentUser = async (req, res, next) => {
  try {
    const userRecord = await UserModel.findById(req.token._id);
    if (!userRecord) {
      return Response.fail(res, 'user not found', HttpStatus.NOT_FOUND);
    }

    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, 'password');
    Reflect.deleteProperty(currentUser, 'salt');
    req.currentUser = currentUser;

    return next();
  } catch (e) {
    Logger.log('error', '🔥 Error attaching user to req: %o', e);

    return Response.fail(res, 'please try again', HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

module.exports = AttachCurrentUser;
