'use strict';

const mongoose = require('mongoose');
const Station = require('../models/station');
const Bike = require('../models/bike');

async function postBike(req, res) {
    const bike = new Bike();
    bike.name = req.body.name;
    bike.kms = req.body.kms;
    bike.description = req.body.description;
    bike.available = req.body.available;
    try {
        await bike.save();
        res.status(200).send({message: "BikeService created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

/**
 * Delete student from Bikes collection
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function deleteBike(req, res) {
    try {
        const _id = req.params.bikeId;

        let bike = await Bike.findByIdAndDelete(_id);
        if(!bike){
            return res.status(404).send({message: 'BikeService not found'})
        }else{
            mongoose.Types.ObjectId(_id);

            await Bike.update({}, {$pull: {bikes: _id}}, {multi: true});

            res.status(200).send({message:'BikeService deleted successfully'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

async function getBikes(req, res) {
    try {
        let bikes = await Bike.find();
        res.status(200).send(bikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function getAvailableBikes(req, res) {
    try {
        let availableBikes = await Bike.find({available: "true"});
        res.status(200).send(availableBikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

module.exports = {
    postBike,
    deleteBike,
    getBikes,
    getAvailableBikes
};
