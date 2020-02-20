const app = require('../../src/app');

describe('\'member-area\' service', () => {
  it('registered the service', () => {
    const service = app.service('member-area');
    expect(service).toBeTruthy();
  });
});
