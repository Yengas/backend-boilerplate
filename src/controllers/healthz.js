const Joi = require('joi');

module.exports = ({ log }) => ({
  indexGet: {
    config: {
      validate: {},
      response: {
        schema: Joi.object().keys({ status: Joi.boolean(), time: Joi.date().timestamp() }).label('Healthz Response')
      },
      description: 'Whether the server is up or not.',
    },
    handler: async function(){
      log.info('Got request for healthz.');
      return { status: true, time: new Date().valueOf() };
    }
  },
});
