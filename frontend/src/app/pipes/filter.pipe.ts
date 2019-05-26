import { Pipe, PipeTransform } from '@angular/core';
import {Station} from "../models/station";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(stations: Station[], text: string): Station[] {
    if (text.length === 0) {
      return stations;
    }

    console.log(text);

    return stations.filter((station) => {
      return station.name.toLowerCase().includes(text.toLowerCase());
    });
  }

}
