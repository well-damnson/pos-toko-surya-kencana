const app = require('../../src/app');

describe('\'item-area\' service', () => {
  it('registered the service', () => {
    const service = app.service('item-area');
    expect(service).toBeTruthy();
  });
});
