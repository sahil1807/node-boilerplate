const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const { errors, isCelebrate } = require('celebrate');
const morganBody = require('morgan-body');
const HttpStatus = require('http-status-codes');
const { prefix } = require('./../config').api;
const Logger = require('../config/Logger');
const { Response } = require('../utils');

const router = require('../api');

exports.loadModules = ({ app }) => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Some sauce that always add since 2014
  // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
  // Maybe not needed anymore ?
  app.use(methodOverride());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // morgan body logs each request and response
  morganBody(app, {
    stream: Logger.stream,
    prettify: process.env.NODE_ENV === 'local',
    maxBodyLength: 2000,
  });

  // handle errors from 'celebrate'
  app.use(errors());

  // Load API routes
  router.loadRoutes(app, prefix);

  // / catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = Error(`Route ${req.url} Not Found`);
    err.status = HttpStatus.NOT_FOUND;
    next(err);
  });

  // / error handlers
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    /*
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return Response.fail(res, err.message, err.status);
    }

    /*
     * Handle Celebrate error so we can have our own response
     */
    if (isCelebrate(err)) {
      return Response.fail(res, err.message, HttpStatus.UNPROCESSABLE_ENTITY, HttpStatus.UNPROCESSABLE_ENTITY, {
        errors: err.details,
      });
    }

    /*
     * Handle multer error
     */
    if (err.name === 'MulterError') {
      return Response.fail(res, err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return Response.fail(res, err.message, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
  });
  app.use((err, req, res) => {
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
