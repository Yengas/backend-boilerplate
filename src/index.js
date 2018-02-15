const Hapi = require('hapi');
const config = require('./config');
const dependencies = {};
const controllers = require('./controllers')(dependencies);
const routes = require('./routes')({ controllers, routeConfigOverrides: { tags: ['api'] } });
const { registerProductionPlugins } = require('./configureServer');
const server = Hapi.server({ port: config.port });

(async function(){
  await registerProductionPlugins(config, server, routes);
  await server.route(routes);
  await server.start();
})()
  .then(() => {
    console.log(`Started listening on http://${config.host}:${config.port}`);
  })
  .catch((err) => {
    console.error(`There was an error while setting up the server.`);
    console.error(err);
    console.error(err.stack);
  });
