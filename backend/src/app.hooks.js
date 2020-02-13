// Application hooks that run for every service
const {disallow, iff} = require('feathers-hooks-common');
let checkLicense = (context) => {
  let licenseURL = 'license';
  if (context.app.get('licenseValid') === true) {
    if (context.path !== licenseURL) {
      return true;
    } else {
      return false;
    }
  } else {
    if (context.path === licenseURL) {
      return true;
    } else {
      return false;
    }
  }
};

module.exports = {
  before: {
    all: [iff((context) => !checkLicense(context), disallow())],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
