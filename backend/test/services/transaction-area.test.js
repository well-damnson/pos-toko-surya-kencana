const app = require('../../src/app');

describe('\'transaction-area\' service', () => {
  it('registered the service', () => {
    const service = app.service('transaction-area');
    expect(service).toBeTruthy();
  });
});
