const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Boom = require('boom');
const Felicity = require('felicity');

const { deepGet, mergeRoutes } = require('../src/utils');
const config = require('../src/config');
const controllers = require('../src/controllers')({});
const modifiedOriginalRoutes = require('../src/routes')({
  controllers,
  routeDefinitionOverrides: { handler: mockHandler },
  routeConfigOverrides: { tags: ['api'] }
});
const mockRoutes = require('../__mocks__/routes')({
  routeConfigOverrides: { tags: ['api'] }
});
const server = Hapi.server({ host: config.host, port: config.port });

async function mockHandler(request){
  const schema = deepGet(request, 'route.settings.response.schema');
  if(!schema){
    console.log(`Got a request for ${request.method} ${request.path} which doesn't have a response schema.`);
    return Boom.notImplemented(`Don't have a response schema for ${request.method} ${request.path}`);
  }

  console.log(`Generating mock response for ${request.method} ${request.path}`);
  return Felicity.example(request.route.settings.response.schema);
}

(async function(){
  await server.register([
    Inert,
    Vision,
    HapiSwagger,
  ]);
  await server.start();
  await server.route(mergeRoutes(modifiedOriginalRoutes, mockRoutes));
})()
  .then(() => {
    console.log(`Started listening on http://${config.host}:${config.port}`);
  })
  .catch((err) => {
    console.error(`There was an error while setting up the mock-api.`);
    console.error(err);
    console.error(err.stack);
  });
