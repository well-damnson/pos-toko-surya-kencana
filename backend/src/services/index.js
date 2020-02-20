const users = require('./users/users.service.js');
const registration = require('./registration/registration.service.js');
const license = require('./license/license.service.js');
const news = require('./news/news.service.js');
const members = require('./members/members.service.js');
const items = require('./items/items.service.js');
const memberArea = require('./member-area/member-area.service.js');
const itemArea = require('./item-area/item-area.service.js');
const transactions = require('./transactions/transactions.service.js');
const transactionArea = require('./transaction-area/transaction-area.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(registration);
  app.configure(license);
  app.configure(news);
  app.configure(members);
  app.configure(items);
  app.configure(memberArea);
  app.configure(itemArea);
  app.configure(transactions);
  app.configure(transactionArea);
};
