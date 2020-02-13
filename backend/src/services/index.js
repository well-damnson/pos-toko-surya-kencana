const users = require('./users/users.service.js');
const registration = require('./registration/registration.service.js');
const license = require('./license/license.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(registration);
  app.configure(license);
};
