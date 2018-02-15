module.exports = {
  host: process.env.APP_HOST || 'localhost',
  port: process.env.PORT || 8080,
  logging: {
    name: 'backend-boilerplate',
    level: 'info'
  }
};
