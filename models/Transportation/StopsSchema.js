const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stopsSchema = new Schema({schoolId: String, stopName: String, distance: String}, {timestamps: true});
const bus = mongoose.model('stopsData', stopsSchema);
module.exports = bus;
