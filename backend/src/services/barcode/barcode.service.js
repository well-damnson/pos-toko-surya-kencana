// Initializes the `barcode` service on path `/barcode`
const { Barcode } = require('./barcode.class');
const hooks = require('./barcode.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/barcode', new Barcode(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('barcode');

  service.hooks(hooks);
};
