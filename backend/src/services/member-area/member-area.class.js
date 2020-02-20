const {dateToArray, arrayToDate, filterObject} = require('../../utils');
/* eslint-disable no-unused-vars */
exports.MemberArea = class MemberArea {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    const app = this.app;
    const membersService = app.service('members');

    let members = await membersService.find({paginate: false});
    let result = members.map((member) => ({
      ...member,
      lahir: dateToArray(member.lahir),
    }));
    return result;
  }

  async get(id, params) {
    const app = this.app;
    const membersService = app.service('members');
    let result = await membersService.get(id);
    result = {...result, lahir: dateToArray(result.lahir)};
    return result;
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    let result = {};

    const acceptableKeys = ['nama', 'alamat', 'hp', 'lahir', 'barcode', 'poin'];
    const newData = filterObject(data, acceptableKeys);
    console.log(newData);
    if (Object.keys(newData).length > 0) {
      const app = this.app;
      const membersService = app.service('members');
      let member = await membersService.get(id);
      console.log(member);
      let query = {...data};
      if (newData.lahir) {
        query = {...query, lahir: arrayToDate(data.lahir)};
      }
      result = await membersService.patch(id, query);
      result = {...result, lahir: dateToArray(result.lahir)};
    }
    return result;
  }

  async remove(id, params) {
    const app = this.app;
    const membersService = app.service('members');
    // let member = await membersService.get(id);
    let result = await membersService.remove(id);
    return result;
  }
};
