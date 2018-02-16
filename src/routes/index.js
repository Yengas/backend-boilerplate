const { createRouteGenerator } = require('../utils');

module.exports = ({ controllers, routeDefinitionOverrides = {}, routeConfigOverrides = {} }) => {
  const { healthz, users } = controllers;
  const createRouteForController = createRouteGenerator(routeDefinitionOverrides, routeConfigOverrides);

  return [
    createRouteForController(healthz.indexGet, {
      method: 'GET',
      path: '/healthz',
    }),
    createRouteForController(healthz.indexGet, {
      method: 'GET',
      path: '/healthzWithAuth',
      config: {
        auth: 'jwt'
      }
    }),
    createRouteForController(users.indexGet, {
      method: 'GET',
      path: '/users',
    }),
    createRouteForController(users.indexPost, {
      method: 'POST',
      path: '/users',
    }),
  ];
};
