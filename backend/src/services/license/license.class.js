let {licenseEvent} = require('../../license');
const {once} = require('events');

/* eslint-disable no-unused-vars */
exports.License = class License {
  constructor(options) {
    this.options = options || {};
  }
  setup(app) {
    this.app = app;
  }
  async create(data, params) {
    let {license, secret} = data;
    licenseEvent.emit('newLicense', license, secret);
    const [value] = await once(licenseEvent, 'resultLicense');
    if (value) {
      return {status: 'success'};
    } else {
      return {status: 'failed'};
    }
  }
};
