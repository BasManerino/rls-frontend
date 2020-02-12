import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrainCompositionPathService {

  constructor(public http: HttpClient) {}

  async allLocations() {
    return await this.http.get('https://rls-backend.herokuapp.com/api/v1/locations', httpOptions).toPromise();
  }

  async allActivityTypes() {
    return await this.http.get('https://rls-backend.herokuapp.com/api/v1/trainactivitytypes/', httpOptions).toPromise();
  }
}
