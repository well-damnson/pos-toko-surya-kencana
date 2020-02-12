const app = require('../../src/app');

describe('"registration" service', () => {
  it('registered the service', () => {
    const service = app.service('register');
    expect(service).toBeTruthy();
  });
});
