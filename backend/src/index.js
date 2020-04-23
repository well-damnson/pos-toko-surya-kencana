/* eslint-disable no-console */
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
);

server.on('listening', async () => {
  setInterval(() => {
    console.log('backing up');
    let backup = app.service('backup');
    backup.find();
  }, 3600000);

  setTimeout(() => {
    let dummyItemData = async () => {
      const itemsService = app.service('items');
      let items = await itemsService.find({limit: 1});
      if (items.total === 0) {
        let dummyData = require('./dummyItemData.json');
        const itemsAreaService = app.service('item-area');
        let itemsArea = await itemsAreaService.create(dummyData);
        console.log(itemsArea);
      }
    };
    dummyItemData();
    let dummyMemberData = async () => {
      const itemsService = app.service('members');
      let items = await itemsService.find({limit: 1});
      if (items.total === 0) {
        let dummyData = require('./dummyMemberData.json');
        const registrationService = app.service('register');
        let registration = await registrationService.create(dummyData);
        console.log(registration);
      }
    };
    dummyMemberData();
  }, 2000);
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port,
  );
});
