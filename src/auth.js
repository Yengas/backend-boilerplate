const JWT = require('jsonwebtoken');

/**
 * Validates the decoded jwt token, without any checks.
 * @param _
 * @param __
 * @param callback the callback to call with validation.
 * @return {*}
 */
function validateTokenNoop(_, __, callback){
  return callback(null, true);
}

function createJWTInstance({ key, algorithm }){
  const addOptions = (options) => ({ algorithm, ...options });

  return {
    sign: function(payload, options = {}){
      return JWT.sign(payload, key, addOptions(options));
    },
    verify: function(token, options = {}){
      return JWT.verify(token, key, addOptions(options));
    },
  };
}

module.exports = {
  validateTokenNoop,
  createJWTInstance
};
