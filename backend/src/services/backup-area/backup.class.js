let {backup, restore} = require('../../utils');

/* eslint-disable no-unused-vars */
exports.Backup = class Backup {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    // services
    let itemsService = this.app.service('items');
    let membersService = this.app.service('members');
    let transactionsService = this.app.service('transactions');
    let usersService = this.app.service('users');

    // fetch all
    let items = await itemsService.find({paginate: false});
    let members = await membersService.find({
      paginate: false,
    });
    let transactions = await transactionsService.find({
      paginate: false,
    });
    let users = await usersService.find({paginate: false});

    // backup
    let backupData = {items, members, transactions, users};
    backup(backupData);

    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }
    restore();
    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {id};
  }
};
