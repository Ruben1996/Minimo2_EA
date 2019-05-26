import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bike } from '../models/bike';
import { Environment } from './environment';
import {Station} from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  environment: Environment;
  selectedBike: Bike;

  constructor(private http: HttpClient) {
    this.selectedBike = new Bike();
    this.environment = new Environment();
  }

  getStations() {
    return this.http.get(this.environment.urlStation);
  }

  getStationDetail(id: string) {
    return this.http.get(this.environment.urlStation + `/${id}`);
  }

  getBikeStationDetail(id: string) {
    return this.http.get(this.environment.urlStation + `/${id}` + '/bikedetail');
  }

  postStation(station: Station) {
    return this.http.post(this.environment.urlStation, station);
  }

  postBiketotheStation(ids: object) {
    return this.http.post(this.environment.urlStation + '/addbike', ids);
  }
  deleteBiketotheStation(stationId: string, bikeId: string) {
    return this.http.delete(this.environment.urlStation + `/${stationId}` + `/${bikeId}`);
  }

  deleteStation(id: string) {
    return this.http.delete(this.environment.urlStation + `/${id}`);
  }
}