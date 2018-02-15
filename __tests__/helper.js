/**
 * Helpers functions for tests.
 */
const Hapi = require('hapi');
const controllerCreator = require('../src/controllers/index');
const routeCreator = require('../src/routes/index');

async function setupServer(dependencies){
  const controllers = controllerCreator(dependencies);
  const routes = routeCreator({ controllers });
  const server = Hapi.server();

  await server.start();
  server.route(routes);
  return server;
}

module.exports = {
  setupServer
};
