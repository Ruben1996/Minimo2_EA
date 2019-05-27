import { Component, OnInit } from '@angular/core';
import {Station} from "../../models/station";
import {Bike} from "../../models/bike";
import {ActivatedRoute} from "@angular/router";
import {StationService} from "../../services/station.service";
import {BikeService} from "../../services/bike.service";

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  stationBikeDetail: Station;
  unassignedBikes: Bike[];
  body: object;

  constructor(private activatedRouter: ActivatedRoute, private stationService: StationService, private bikeService: BikeService) {
    this.stationBikeDetail = new Station();
    this.unassignedBikes = [];
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.stationBikeDetail._id = params.id;
      } else {
        this.stationBikeDetail._id = '';
      }
    });
    this.getBikeDetail(this.stationBikeDetail._id);
    this.getUnassignedBikes();
  }

  async getUnassignedBikes() {
    await this.bikeService.getavailableBikes()
        .subscribe(res => {
          console.log(res);
          this.unassignedBikes = res as Bike[];
        });
    console.log(this.unassignedBikes);
  }

  async getBikeDetail(id: string) {
    await this.stationService.getBikeStationDetail(id)
        .subscribe(res => {
          console.log(res);
          this.stationBikeDetail = res as Station;
        });
    console.log(this.stationBikeDetail);
  }

  async addBiketotheStation(id: string, i: number) {
    this.body = {
      stationId: this.stationBikeDetail._id,
      bikeId: id
    };
    await this.stationService.postBiketotheStation(this.body)
        .subscribe(res => {
              console.log(res);
              this.unassignedBikes.splice(i, 1);
              this.getBikeDetail(this.stationBikeDetail._id);
            },
            err => {
              console.log(err);
        });
    }
  async deleteBiketotheStation(id: string, i: number) {
    if (confirm('Are you sure ?')) {
      await this.stationService.deleteBiketotheStation(this.stationBikeDetail._id, id)
          .subscribe(res => {
                console.log(res);
                this.stationBikeDetail.bikes.splice(i, 1);
                this.getUnassignedBikes();
              },
              err => {
                console.log(err);
              });
    }
  }
}
