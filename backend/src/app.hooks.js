// Application hooks that run for every service
const {disallow, iff} = require('feathers-hooks-common');
let checkLicense = (context) => {
  let licenseURL = 'license';
  if (context.app.get('licenseValid') === true) {
    console.log('license is valid, you may go');
    if (context.path !== licenseURL) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log('license is NOT valid');
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
