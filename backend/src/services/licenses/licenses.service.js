// Initializes the `licenses` service on path `/licenses`
const { Licenses } = require('./licenses.class');
const createModel = require('../../models/licenses.model');
const hooks = require('./licenses.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/licenses', new Licenses(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('licenses');

  service.hooks(hooks);
};
