const {
  prepend,
  filterObject,
  dateToArray,
  arrayToDate,
  capitalizeFirstLetter,
} = require('../../utils');

/* eslint-disable no-unused-vars */
exports.TransactionArea = class TransactionArea {
  constructor(options) {
    this.options = options || {};
  }

  async setup(app) {
    this.app = app;
  }

  async find(params) {
    let result = [];
    let {start, end} = params.query;
    start = new Date(arrayToDate(JSON.parse(start)));
    end = new Date(arrayToDate(JSON.parse(end)));
    console.log(start, end);

    const app = this.app;
    const transactionsService = app.service('transactions');
    
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
      'type',
      'memberBarcode',
      'jual',
      'beli',
      'total',
      'paymentMethod',
      'noRef',
    ];
    const newData = filterObject(data, acceptableKeys);
    const {
      type,
      memberBarcode,
      total,
      paymentMethod,
      jual,
      beli,
      noRef,
    } = newData;
    if (type && memberBarcode && total && paymentMethod) {
      let processJual = false;
      let processBeli = false;
      if (
        type === 'tukar' &&
        Array.isArray(jual) &&
        jual.length > 0 &&
        Array.isArray(beli) &&
        beli.length > 0
      ) {
        processBeli = true;
        processJual = true;
      } else if (type === 'beli' && Array.isArray(beli) && beli.length > 0) {
        processBeli = true;
      } else if (type === 'jual' && Array.isArray(jual) && jual.length > 0) {
        processJual = true;
      } else {
        return {};
      }
      console.log('jual', processJual);
      console.log('beli', processBeli);

      const app = this.app;

      // Process Jual Patch & Beli Create
      const itemsService = app.service('items');
      let penjualan = [];
      if (processJual) {
        let checkStock = await Promise.all(
          jual.map(async (item) => {
            return await itemsService.get(item._id);
          }),
        );
        let next = true;
        checkStock.map((item) => {
          if (item.terjual === true) next = false;
        });
        if (next) {
          penjualan = await Promise.all(
            jual.map(async (item) => {
              return await itemsService.patch(item._id, {
                terjual: true,
                jual: item.jual,
              });
            }),
          );
        } else {
          return {};
        }
      }
      console.log(penjualan);

      let pembelian = [];
      if (processBeli) {
        pembelian = await Promise.all(
          beli.map(async (item) => {
            return await itemsService.create({...item});
          }),
        );
      }
      console.log(pembelian);

      // Make Trx Number
      const transactionsService = app.service('transactions');
      const {total: totalTrx} = await transactionsService.find({
        query: {createdAt: {$gte: new Date().setHours(0, 0, 0, 0)}},
      });
      console.log(totalTrx);
      const today = dateToArray(new Date().setHours(0, 0, 0, 0));
      let noTrx =
        prepend(totalTrx, 4) +
        ' / ' +
        prepend(today[0], 2) +
        '-' +
        prepend(today[1], 2) +
        '-' +
        prepend(today[2], 4) +
        ' ' +
        capitalizeFirstLetter(type);

      console.log(noTrx);
      // Input Poin
      const membersService = app.service('members');
      const {_id: memberId, poin} = (
        await membersService.find({
          query: {barcode: memberBarcode},
        })
      ).data[0];
      console.log(memberId);
      const memberAreaService = app.service('member-area');
      await memberAreaService.patch(memberId, {
        poin: poin + Math.trunc(total / 1000000),
      });
      result = await transactionsService.create({
        memberBarcode,
        noTransaksi: noTrx,
        jual: penjualan,
        beli: pembelian,
        total,
        paymentMethod,
        noRef,
      });
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
