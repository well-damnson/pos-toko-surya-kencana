// transactions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'transactions';
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const itemSchema = new Schema({
    nama: {type: String, required: true},
    jenis: {type: String, required: true},
    berat: {type: Number, required: true},
    kadar: {type: Number, required: true},
    terjual: {type: Boolean, default: false},
    posisi: {type: String},
    barcode: {type: String, required: true},
    picture: {type: String},
    jual: {type: Number},
    beli: {type: Number, default: 0},
  });
  const schema = new Schema(
    {
      memberBarcode: {type: String},
      noTransaksi: {type: String, required: true},
      jual: [itemSchema],
      beli: [itemSchema],
      total: {type: Number, required: true},
      paymentMethod: {type: String, required: true},
      noRef: {type: String},
    },
    {
      timestamps: true,
    },
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
