const {dateToArray} = require('../../utils');

/* eslint-disable no-unused-vars */
exports.News = class News {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }
  
  async find(params) {
    let fixedYear = 2000;
    // console.log(new Date(2020, 11, 31).toString());
    // console.log(dateToArray(new Date(2020, 11, 31)));

    // let today = new Date(2020, 10, 24).setHours(0, 0, 0, 0);
    let today = new Date(Date.now()).setHours(0, 0, 0, 0);
    // console.log(dateToArray(today));

    let minus7day = new Date(today - 604800000).setFullYear(fixedYear);
    // console.log(dateToArray(minus7day));
    let plus7day = new Date(today + 604800000).setFullYear(fixedYear);
    // console.log(dateToArray(plus7day));

    const membersService = this.app.service('members');

    let members = await membersService.find({paginate: false});
    let birthday = [];
    let point = [];
    for (let index = 0; index < members.length; index++) {
      const member = members[index];
      let {lahir, poin} = member;
      let time = new Date(lahir).setFullYear(fixedYear);
      member.lahir = dateToArray(member.lahir);
      if (time >= minus7day && time <= plus7day) {
        birthday.push(member);
      }
      if (poin >= 25) {
        point.push(member);
      }
    }
    let result = {birthday, point};
    return result;
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
