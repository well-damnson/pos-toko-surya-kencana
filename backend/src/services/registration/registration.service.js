// Initializes the `registration` service on path `/register`
const {Registration} = require('./registration.class');
const hooks = require('./registration.hooks');

module.exports = function(app) {
  const options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/register', new Registration(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('register');

  service.hooks(hooks);
};
