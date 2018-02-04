const Joi = require('joi');

module.exports = {
  userSchema: Joi.object().keys({
    id: Joi.string().guid(),
    name: Joi.string(),
    password: Joi.string().hex().length(32),
    createdAt: Joi.date().timestamp(),
    updatedAt: Joi.date().timestamp()
  }).label("User Schema"),
  requestSuccessfulSchema: Joi.object().keys({
    ok: Joi.valid(true)
  }).label("Request Success")
};