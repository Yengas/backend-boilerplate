const Joi = require('joi');

module.exports = ({}) => ({
  indexGet: {
    validate: {},
    response: {
      schema: Joi.object().keys({ status: Joi.boolean(), time: Joi.date().timestamp() }).label("Healthz Response")
    },
    handler: async function(){
      return { status: true, time: new Date().valueOf() };
    }
  },
});