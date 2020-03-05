// Initializes the `news` service on path `/news`
const { News } = require('./news.class');
const hooks = require('./news.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/news', new News(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('news');

  service.hooks(hooks);
};
