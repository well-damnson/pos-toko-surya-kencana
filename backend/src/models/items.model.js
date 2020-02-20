// items-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = 'items';
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const schema = new Schema(
    {
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
