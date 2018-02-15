const Joi = require('joi');

/**
 * Checks the given error and makes sure its caused by async throws.
 * @param boom
 */
function checkIfAsyncThrowError(boom){
  return boom.statusCode === 500 &&
    boom.error === 'Internal Server Error' &&
    boom.message === 'An internal server error occurred';
}

function fixBoomPayload(boom, code, errorCodes){
  boom.output.payload.message = errorCodes.http[code] || errorCodes.noCustomMessage || boom.error;
  return boom;
}

const internal = {
  schema: Joi.object().keys({
    http: Joi.object().unknown().required(),
    noCustomMessage: Joi.string().required()
  }).unknown().required()
};

/**
 * This plugin tries to standardize Boom errors, so we have consistent error structure where each errors has
 * `status`, `error` and `message` fields. This helps with internationalization.
 */
module.exports = {
  name: 'errorStandard',
  version: '0.0.1',

  register(server, options){
    const { error, errorCodes } = Joi.validate((options || {}).errorCodes, internal.schema);
    if(error) return Promise.reject(error);

    server.ext('onPreResponse', function(req, h){
      const res = req.response;
      if(!res.isBoom) return h.continue;
      const { payload } = res.output;

      if(checkIfAsyncThrowError(payload)){
        fixBoomPayload(res, 500, errorCodes);
      } else if(
        payload.statusCode &&
        payload.statusCode.constructor === Number &&
        (!payload.message || payload.error === payload.message)
      ){
        fixBoomPayload(res, payload.statusCode, errorCodes);
      }

      return h.continue;
    });
  }
};
