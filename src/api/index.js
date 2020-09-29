const { Response } = require('../utils');
const Logger = require('../config/Logger');
const userRoutes = require('./modules/user/userRoutes');

exports.loadRoutes = (app, prefix) => {
  app.use(`${prefix}/users`, userRoutes);

  app.get('/status', (req, res) => {
    Logger.log('info', 'checking status', { status: 1 });

    Response.success(res);
  });
};
