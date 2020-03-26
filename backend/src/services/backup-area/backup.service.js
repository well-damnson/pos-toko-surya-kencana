// Initializes the `backup` service on path `/backup`
const { Backup } = require('./backup.class');
const hooks = require('./backup.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/backup', new Backup(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('backup');

  service.hooks(hooks);
};
