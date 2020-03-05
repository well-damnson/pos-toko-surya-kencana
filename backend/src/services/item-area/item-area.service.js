// Initializes the `item-area` service on path `/item-area`
const { ItemArea } = require('./item-area.class');
const hooks = require('./item-area.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/item-area', new ItemArea(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('item-area');

  service.hooks(hooks);
};
