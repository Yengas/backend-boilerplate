const Hapi = require('hapi');
const config = require('./config');
const dependencies = {};
const { registerProductionPlugins } = require('./configureServer');

(async function(){
  const controllers = require('./controllers')(dependencies);
  const routes = require('./routes')({ controllers, routeConfigOverrides: { tags: ['api'] } });
  const server = Hapi.server({ port: config.port });

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
