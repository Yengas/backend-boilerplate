const Boom = require('boom');
const Joi = require('joi');
const { userSchema, requestSuccessfulSchema } = require('../schemas/controllers/common');

module.exports = ({}) => ({
  indexGet: {
    config: {
      validate: {},
      response: {schema: userSchema},
      description: 'list users.',
    },
    handler: async function(){
      return Boom.notImplemented();
    }
  },
  indexPost: {
    config: {
      validate: {payload: Joi.object().keys({id: Joi.number().required()}).label('User post request.')},
      response: {schema: requestSuccessfulSchema},
      description: 'change user properties.',
    },
    handler: async function(){
      throw new Error('An unexpected error eaxmple with hapijs.');
    }
  },
});
