const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const ErrorStandard = require('./plugins/error-standard');
const errorCodes = require('./resources/error-codes');

/**
 * Registers plugins that will be used in production.
 * @param server
 * @param config
 * @return {Promise<void>}
 */
async function registerProductionPlugins(server, config){
  await server.register([
    Inert,
    Vision,
  ]);

  await server.register({
    plugin: ErrorStandard,
    options: { errorCodes }
  });

  await server.register({
    plugin: HapiSwagger,
    options: { host: `${config.swagger.host}:${config.swagger.port}` }
  });
}

module.exports = {
  registerProductionPlugins,
};
