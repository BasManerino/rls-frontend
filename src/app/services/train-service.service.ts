import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainServiceService {

  private trainTypes = [
    {
      id: 0,
      type: 'Goederenvervoer'
    },
    {
      id: 1,
      type: 'Personenvervoer'
    }
  ];

  private tractionTypes = [
    {
      id: 0,
      type: 'Not specified'
    },
    {
      id: 1,
      type: 'External electric power supply for traction'
    },
    {
      id: 2,
      type: 'Onboard traction power supply for traction without external electrical or other power supply available'
    },
    {
      id: 3,
      type: 'Hybrid traction (both onboard or electric traction)'
    }
  ];

  private driverIndication = [
    {
      id: 0,
      indication: 'No driver present'
    },
    {
      id: 1,
      indication: 'Driver(s) is/are present'
    }
  ];

  constructor(public http: HttpClient) {
  }

  getTrainTypes() {
    return this.trainTypes;
  }

  getTractionTypes() {
    return this.tractionTypes;
  }

  getDriverIndication() {
    return this.driverIndication;
  }
}
