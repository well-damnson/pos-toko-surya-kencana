const {dateToArray, arrayToDate, filterObject} = require('../../utils');
/* eslint-disable no-unused-vars */
exports.Registration = class Registration {
  constructor(options) {
    this.options = options || {};
  }

  async setup(app) {
    this.app = app;
  }

  async find(params) {
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

    const app = this.app;
    let result = {};
    console.log(data);
    if (data.type === 'admin') {
      let {name, password} = filterObject(data, ['name', 'password']);
      if (name && password) {
        const usersService = app.service('users');
        result = await usersService.create({name, password});
      }
    } else if (data.type === 'member') {
      const membersService = app.service('members');
      let {nama, hp, lahir, ...others} = filterObject(data, [
        'nama',
        'alamat',
        'hp',
        'lahir',
        'barcode',
      ]);
      if (nama && hp && lahir) {
        // Milliseconds for "lahir"
        let ms = arrayToDate(lahir);
        result = await membersService.create({
          nama,
          hp,
          lahir: ms,
          ...others,
        });
        // console.log(result);
        let newLahir = dateToArray(ms);
        result = {...result, lahir: newLahir};
      }
    }

    return result;
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
