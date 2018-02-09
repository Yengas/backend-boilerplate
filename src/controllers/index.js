module.exports = (dependencies) => ({
  healthz: require('./healthz')(dependencies),
  users: require('./users')(dependencies),
});
