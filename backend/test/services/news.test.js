const app = require('../../src/app');

describe('\'news\' service', () => {
  it('registered the service', () => {
    const service = app.service('news');
    expect(service).toBeTruthy();
  });
});
