const fs = require('fs');
const path = require('path');

function requireFolderWithKeys(folder, keys){
  keys.reduce((curr, key) => ({ ...curr, key: require(path.join(folder, key)) }), {});
}

/**
 * Given an object and a path tries to get the value at given path.
 * @param obj the object to get the value from.
 * @param path list of keys or a string where keys are seperated by dot.
 * @return {*}
 */
function deepGet(obj, path){
  if(!path || path.length === 0) return obj;
  if(!obj || obj.constructor !== Object) return obj;
  if(path.constructor !== Array && path.constructor !== String) return obj;
  const keys = path.constructor === Array ? path : path.split('.');

  return keys.reduce((curr, key) => curr ? curr[key] : curr, obj);
}

module.exports = {
  requireFolderWithKeys,
  deepGet
};