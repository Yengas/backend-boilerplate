const Joi = require('joi');
const { setupServer } = require('../helper');

describe('healthz controller', () => {
  let server;

  beforeAll(async () => {
    server = await setupServer({});
  });

  describe('GET /', () => {
    it('should response with a valid example', async () => {
      const { payload } = await server.inject('/healthz');
      const schema = Joi.object().keys({
        status: Joi.boolean().required(),
        time: Joi.date().timestamp(),
      }).required();

      Joi.assert(payload, schema, "Couldn't match the /healthz result with the expected schema.");
    });
  });
});
