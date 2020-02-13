const app = require('../../src/app');

describe('\'license\' service', () => {
  it('registered the service', () => {
    const service = app.service('license');
    expect(service).toBeTruthy();
  });
});
