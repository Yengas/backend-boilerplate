const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const ErrorStandard = require('./plugins/error-standard');
const errorCodes = require('./resources/error-codes');

async function registerProductionPlugins(config, server){
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
    options: { host: `${config.host}:${config.port}` }
  });
}

module.exports = {
  registerProductionPlugins,
};
