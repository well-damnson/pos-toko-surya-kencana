// Initializes the `license` service on path `/license`
const { License } = require('./license.class');
const hooks = require('./license.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/license', new License(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('license');

  service.hooks(hooks);
};
