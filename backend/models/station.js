const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Student schema
 */
const StationSchema = new Schema({
    name: { type: String, required: true },
    state: { type: String, required: true },
    description: {type: String, required: true},
    bikes: [{ type: Schema.ObjectId, ref: 'Bike', unique: false }]
});

/**
 * Export the Student schema
 * @type {Model}
 */
module.exports = mongoose.model('Station', StationSchema);

