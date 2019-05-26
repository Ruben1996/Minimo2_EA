'use strict';

const express = require('express');
const bikeCtrl = require('../controllers/bike');
const stationCtrl = require('../controllers/station');
const api = express.Router();

/**
 * Routes restful API
 */
api.get('/stations', stationCtrl.getStations);
api.post('/stations/addbike', stationCtrl.postBikeStation);
api.post('/stations', stationCtrl.postStation);
api.get('/stations/:stationId', stationCtrl.getStationDetail);
api.get('/stations/:stationId/bikedetail', stationCtrl.getBikeStationDetail);
api.delete('/stations/:stationId/:bikeId', stationCtrl.deleteBiketotheStation);

api.get('/bikes', bikeCtrl.getBikes);
api.get('/bikes/available', bikeCtrl.getAvailableBikes);
api.post('/bikes', bikeCtrl.postBike);
api.delete('/bikes/:bikeId', bikeCtrl.deleteBike);


module.exports = api;
