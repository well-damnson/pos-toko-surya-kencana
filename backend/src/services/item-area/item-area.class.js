const {prepend, filterObject} = require('../../utils');
/* eslint-disable no-unused-vars */
exports.ItemArea = class ItemArea {
  constructor(options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    const app = this.app;
    const itemsService = app.service('items');
    let queryObj = filterObject(params.query, ['posisi']);
    if (Object.keys(queryObj).length > 0) {
      queryObj.terjual = false;
    }
    console.log(queryObj);
    let result = await itemsService.find({
      paginate: false,
      query: {
        ...queryObj,
        $sort: {
          createdAt: -1,
        },
      },
    });
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
    let result = {};
    const acceptableKeys = [
      'nama',
      'jenis',
      'berat',
      'kadar',
      'posisi',
      'picture',
      'beli',
    ];
    const newData = filterObject(data, acceptableKeys);
    let {nama, jenis, berat, kadar, ...others} = newData;
    if (nama && jenis && berat && kadar) {
      const app = this.app;
      const itemsService = app.service('items');
      const items = await itemsService.find();
      const {total} = items;
      const barcode = prepend(total, 12);
      let item = {nama, jenis, berat, kadar, barcode, ...others};

      result = await itemsService.create(item);
    }
    return result;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    let result = {};
    const acceptableKeys = [
      'nama',
      'jenis',
      'berat',
      'kadar',
      'terjual',
      'posisi',
      'picture',
      'jual',
      'beli',
    ];

    const newData = filterObject(data, acceptableKeys);

    if (Object.keys(newData).length > 0) {
      const app = this.app;
      const itemsService = app.service('items');
      console.log(newData);
      const item = {
        ...newData,
        updatedAt: new Date(),
      };
      console.log(item);
      result = await itemsService.patch(id, item);
    }

    return result;
  }

  async remove(id, params) {
    return {id};
  }
};
