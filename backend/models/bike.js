const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of SubjectService schema, containing the student id
 */
const BikeSchema = new Schema ({
    name: { type: String, required: true},
    kms: {type: String, required: true},
    description: {type: String, required: true},
    available: {type: Boolean, required: true, unique: false }
});

module.exports = mongoose.model('Bike', BikeSchema);
