const app = require('../../src/app');

describe('\'transactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('transactions');
    expect(service).toBeTruthy();
  });
});
