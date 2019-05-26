'use strict';

const Station = require('../models/station');
const Bike = require('../models/bike');

/**
 * Add new StationService to the subject collection
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function postStation(req, res) {
    console.log('Station Name', req.body.name);
    const station = new Station();
    station.name = req.body.name;
    station.state = req.body.state;
    station.description = req.body.description;
    console.log(station);

    try {
        await station.save();
        res.status(200).send({message: "StationService created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

async function getStations(req, res) {
    try {
        let stations = await Station.find().select({bikes: 0});
        res.status(200).send(stations);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function getStationDetail(req, res) {
    try {
        const _id = req.params.stationId;

        //We use populate to return the detail of every student, but only the name
        //Populates automatically find every student that has the specified ID, instead of doing by us
        let station = await Station.findById(_id).populate('bikes', 'name');
        if(!station){
            return res.status(404).send({message: 'StationService not found'})
        }else{
            res.status(200).send(station)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

async function postBikeStation(req, res) {
    try{
        const stationId = req.body.stationId;
        const bikeId = req.body.bikeId;
        let bikeFound = await Bike.findById(bikeId);

        if (!bikeFound) {
            return res.status(404).send({message: 'BikeService not found'})
        } else {
            let stationUpdated = await Station.findOneAndUpdate({_id: stationId}, {$addToSet: {bikes: bikeId}});
            if (!stationUpdated) {
                return res.status(404).send({message: 'StationService not found'})
            }
            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {available: "false"});
            console.log(bikeUpdated);
        }
        res.status(200).send({message: "BikeService added successfully to the station"})
    } catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

/**
 * Get the details of the students of a specific subject
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
async function getBikeStationDetail(req, res) {
    try {
        const _id = req.params.stationId;
        let station = await Station.findById(_id).populate('bikes');
        if(!station){
            return res.status(404).send({message: 'StationService not found'})
        }else{
            res.status(200).send(station)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

async function deleteBiketotheStation(req, res) {

    try{
        const stationId = req.params.stationId;
        const bikeId = req.params.bikeId;

        console.log(`StationID: ${stationId}, BikeID: ${bikeId}`);
        let station = await Station.findById(stationId);
        if(!station){
            return res.status(404).send({message: 'StationService not found'})
        }else{
            console.log('hasta aqui');
            let stationUpdated = await Station.update({_id: stationId}, {$pull: {bikes: bikeId}});
            if (stationUpdated.nModified === 0) {
                return res.status(404).send({message: 'Bike not found'})
            }
            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {available: "true"});
            Console.log(bikeUpdated);

        }
        res.status(200).send({message:'Bike deleted successfully'})
    }catch(err){
        res.status(500).send(err)
    }


}

/**
 * Export all the functions to use them anywhere
 * @type {{getSubjectDetail: getSubjectDetail, postSubject: postSubject, deleteSubject: deleteSubject, postStudentSubject: postStudentSubject, getSubjects: getSubjects, getStudentSubjectDetail: getStudentSubjectDetail}}
 */
module.exports = {
    postStation,
    getStations,
    getStationDetail,
    postBikeStation,
    getBikeStationDetail,
    deleteBiketotheStation
};
