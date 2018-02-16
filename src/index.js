const Hapi = require('hapi');
const config = require('./config');
const log = require('./log')(config.logging);
const { registerProductionPlugins } = require('./configureServer');

(async function(){
  const dependencies = { log };
  const controllers = require('./controllers')(dependencies);
  const routes = require('./routes')({ controllers, routeConfigOverrides: { tags: ['api'] } });
  const server = Hapi.server({ port: config.port });

  await registerProductionPlugins(config, server, routes);
  await server.route(routes);
  await server.start();
})()
  .then(() => {
    const { host, port } = config;
    log.info({ host, port }, 'Started listening');
  })
  .catch((err) => {
    log.error(`There was an error while setting up the server.`);
    log.error(err);
  });
