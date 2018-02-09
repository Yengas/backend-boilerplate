const { createRouteGenerator } = require('../utils');

module.exports = ({ controllers, routeDefinitionOverrides = {}, routeConfigOverrides = {} }) => {
  const { healthz, users } = controllers;
  const createRouteForController = createRouteGenerator(routeDefinitionOverrides, routeConfigOverrides);

  return [
    createRouteForController(healthz.indexGet, {
      method: 'GET',
      path: '/healthz',
      config: {
        description: 'Whether the server is up or not.'
      }
    }),
    createRouteForController(users.indexGet, {
      method: 'GET',
      path: '/users',
      config: {
        description: 'list users.'
      }
    }),
    createRouteForController(users.indexPost, {
      method: 'POST',
      path: '/users',
      config: {
        description: 'change user properties.'
      }
    }),
  ];
};
