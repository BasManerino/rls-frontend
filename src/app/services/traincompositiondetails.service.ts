import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TraincompositiondetailsService {

  private component = new Subject<[]>();
  component$ = this.component.asObservable();

  private updateComponent = new Subject<[]>();
  updateComponent$ = this.updateComponent.asObservable();

  private compositionList = new Subject<[]>();
  compositionList$ = this.compositionList.asObservable();

  private toUpdateData;

  constructor(public http: HttpClient) {
  }

  async allLocomotives() {
    return await this.http.get('https://rls-backend.herokuapp.com/api/v1/tractions/', httpOptions).toPromise();
  }

  async allWagons() {
    return await this.http.get('https://rls-backend.herokuapp.com/api/v1/wagons/', httpOptions).toPromise();
  }

  async dangerousGoodLabels() {
    return await this.http.get('https://rls-backend.herokuapp.com/api/v1/dangerlabels/', httpOptions).toPromise();
  }

  saveComponent(component) {
    this.component.next(component);
  }

  getSelectedDetails() {
    return this.toUpdateData;
  }

  setSelectedDetails(data) {
    this.toUpdateData = data;
  }

  updateDetails(data) {
    this.updateComponent.next(data);
  }

  editComponent(component) {
    this.updateComponent.next(component);
  }

  setSavedComposition(message) {
    this.compositionList.next(message);
  }
}
