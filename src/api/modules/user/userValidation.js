const { celebrate, Joi } = require('celebrate');

module.exports = {
  uploadUser: celebrate({
    body: Joi.object().keys({
      file: Joi.object()
        .keys({
          originalname: Joi.string()
            .trim()
            .required(),
          fieldname: Joi.string()
            .trim()
            .required(),
          mimetype: Joi.string()
            .trim()
            .required(),
          buffer: Joi.binary().required(),
          size: Joi.number()
            .integer()
            .min(1)
            .required(),
        })
        .required(),
    }),
  }),
};
