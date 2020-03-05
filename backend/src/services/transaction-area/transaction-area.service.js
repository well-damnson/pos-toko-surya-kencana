// Initializes the `transaction-area` service on path `/transaction-area`
const { TransactionArea } = require('./transaction-area.class');
const hooks = require('./transaction-area.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/transaction-area', new TransactionArea(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transaction-area');

  service.hooks(hooks);
};
