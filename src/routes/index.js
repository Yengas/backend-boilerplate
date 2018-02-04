module.exports = ({ controllers, routeDefinitionOverrides = {}, routeConfigOverrides = {} }) => {
  const { healthz, users } = controllers;

  function createRouteForController(controller){
    return function(routeConfig){
      return {
        ...routeConfig,
        config: {
          validate: controller.validate,
          response: controller.response,
          ...routeConfig.config,
          ...routeConfigOverrides
        },
        handler: controller.handler,
        ...routeDefinitionOverrides
      };
    };
  }

  return [
    createRouteForController(healthz.indexGet)({
      method: 'GET',
      path: '/healthz',
      config: {
        description: 'Whether the server is up or not.'
      }
    }),
    createRouteForController(users.indexGet)({
      method: 'GET',
      path: '/users',
      config: {
        description: 'list users.'
      }
    }),
    createRouteForController(users.indexPost)({
      method: 'POST',
      path: '/users',
      config: {
        description: 'change user properties.'
      }
    }),
  ];
};

