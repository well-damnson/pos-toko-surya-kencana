const app = require('../../src/app');

describe('\'licenses\' service', () => {
  it('registered the service', () => {
    const service = app.service('licenses');
    expect(service).toBeTruthy();
  });
});
