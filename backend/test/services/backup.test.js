const app = require('../../src/app');

describe('\'backup\' service', () => {
  it('registered the service', () => {
    const service = app.service('backup');
    expect(service).toBeTruthy();
  });
});
