const { createRouteGenerator } = require('../../src/utils');

async function userGetMockHandler(){
  return {
    id: "e9873df6-8374-47c9-88cd-f5a02f6512cc",
    name: "Yengas",
    password: "A3DCB4D229DE6FDE0DB5686DEE47145D",
    createdAt: new Date().valueOf(),
    updatedAt: new Date().valueOf(),
  };
}

module.exports = ({ routeDefinitionOverrides = {}, routeConfigOverrides = {} }) => {
  const createRouteForController = createRouteGenerator(routeDefinitionOverrides, routeConfigOverrides);
  const userControllers = require('../../src/controllers/users.js')({});
  // An example of creating a custom mock endpoint with just the handler different
  const userGetMockController =  Object.assign({}, userControllers.indexGet, { handler: userGetMockHandler });

  return [
    createRouteForController(userGetMockController, {
      method: 'GET',
      path: '/users',
    })
  ];
};