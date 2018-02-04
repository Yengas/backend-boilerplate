const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const config = require('./config');
const dependencies = {};
const controllers = require('./controllers')(dependencies);
const routes = require('./routes')({ controllers, routeConfigOverrides: { tags: ['api'] } });
const server = Hapi.server({ port: config.port });

(async function(){
  await server.register([
    Inert,
    Vision
  ]);
  await server.register({
    plugin: HapiSwagger,
    options: { }
  });
  await server.start();
  server.route(routes);
})()
  .then(() => {
    console.log(`Started listening on http://${config.host}:${config.port}`);
  })
  .catch((err) => {
    console.error(`There was an error while setting up the server.`);
    console.error(err);
    console.error(err.stack);
  });