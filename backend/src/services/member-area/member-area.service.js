// Initializes the `member-area` service on path `/member-area`
const { MemberArea } = require('./member-area.class');
const hooks = require('./member-area.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/member-area', new MemberArea(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('member-area');

  service.hooks(hooks);
};
