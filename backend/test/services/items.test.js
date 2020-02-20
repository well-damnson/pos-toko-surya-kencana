const app = require('../../src/app');

describe('\'items\' service', () => {
  it('registered the service', () => {
    const service = app.service('items');
    expect(service).toBeTruthy();
  });
});
