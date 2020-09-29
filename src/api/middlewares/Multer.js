const multer = require('multer');
const _ = require('lodash');

const upload = multer();

class MulterMiddleware {
  static single(name) {
    const middleware = upload.single(name);

    return (req, res, next) =>
      middleware(req, res, result => {
        if (_.isObjectLike(req.file)) {
          req.body[name] = req.file;
        }

        return next(result);
      });
  }

  static array(name, maxCount) {
    const middleware = upload.array(name, maxCount);

    return (req, res, next) =>
      middleware(req, res, result => {
        if (req.files.length) {
          req.body[name] = req.files;
        }

        return next(result);
      });
  }

  static fields(fields = []) {
    const middleware = upload.fields(fields);

    return (req, res, next) =>
      middleware(req, res, result => {
        fields.forEach(v => {
          if (v.name in req.files) {
            req.body[v.name] = req.files[v.name];
          }
        });

        return next(result);
      });
  }
}

module.exports = MulterMiddleware;
