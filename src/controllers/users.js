const Boom = require('boom');
const Joi = require('joi');
const { userSchema, requestSuccessfulSchema } = require('../schemas/controllers/common');

module.exports = ({}) => ({
  indexGet: {
    validate: {},
    response: { schema: userSchema },
    handler: async function(){
      return Boom.notImplemented('User retrieve endpoint is not implement yet!');
    }
  },
  indexPost: {
    validate: { payload: Joi.object().keys({ id: Joi.number().required() }).label('User post request.') },
    response: { schema: requestSuccessfulSchema },
    handler: async function(){
      throw new Error('An error eaxmple with hapijs.');
    }
  },
});