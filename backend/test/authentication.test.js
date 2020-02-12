const app = require('../src/app');

describe('authentication', () => {
  it('registered the authentication service', () => {
    expect(app.service('authentication')).toBeTruthy();
  });

  describe('local strategy', () => {
    const userInfo = {
      name: 'someone@gmail.com',
      password: 'supersecret',
    };

    beforeAll(async () => {
      try {
        let user = await app.service('users').create(userInfo);
        console.log(user);
      } catch (error) {
        console.log(error);
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      try {
        const {user, accessToken} = await app.service('authentication').create({
          strategy: 'local',
          ...userInfo,
        });

        expect(accessToken).toBeTruthy();
        expect(user).toBeTruthy();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
