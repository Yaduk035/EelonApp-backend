const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stopsSchema = new Schema({schoolId: String, KmPrice: Number}, {timestamps: true});
const price = mongoose.model('priceData', stopsSchema);
module.exports = price;
