import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class TrainCompositionService {
  public currentId;
  public currentStartLocation;
  private data = new Subject<[]>();
  data$ = this.data.asObservable();

  private activeJourney = new Subject<[]>();
  activeJourney$ = this.activeJourney.asObservable();

  constructor(public http: HttpClient) {}

  async allTcms() {
    return await this.http
      .get(
        "https://rls-backend.herokuapp.com/api/v1/traincompositionmessages/",
        httpOptions
      )
      .toPromise();
  }

  async allTrains() {
    return await this.http
      .get("https://rls-backend.herokuapp.com/api/v1/trains/", httpOptions)
      .toPromise();
  }

  setCurrentId(id) {
    this.currentId = id;
  }

  setData(data) {
    this.data.next(data);
  }

  setCurrentStartLocation(startLocation) {
    this.currentStartLocation = startLocation;
  }

  setActiveJourney(id) {
    this.activeJourney.next(id);
  }

  async loadTcm(id) {
    return await this.http
      .get(
        `https://rls-backend.herokuapp.com/api/v1/traincompositionmessages/${id}/`,
        httpOptions
      )
      .toPromise();
  }

  async loadTrain(id) {
    return await this.http
      .get(
        `https://rls-backend.herokuapp.com/api/v1/trains/${id}/`,
        httpOptions
      )
      .toPromise();
  }

  async createTcm(train) {
    return await this.http
      .post(
        "https://rls-backend.herokuapp.com/api/v1/traincompositionmessages/",
        {
          train: `https://rls-backend.herokuapp.com/api/v1/trains/${train}`,
        },
        httpOptions
      )
      .toPromise();
  }

  async createTrain(location, train) {
    return await this.http
      .post(
        "https://rls-backend.herokuapp.com/api/v1/trains/",
        {
          transferPoint: `https://rls-backend.herokuapp.com/api/v1/locations/${location}`,
          operationalTrainNumber: train,
          scheduledDateTimeAtTransfer: "2020-01-15T11:26:18.306Z",
          scheduledTimeAtHandover: "2020-01-15T11:26:18.306Z",
          "trainType": 2,
        },
        httpOptions
      )
      .toPromise();
  }

  async addJourneysections(start, end, train) {
    return await this.http
      .post(
        `https://rls-backend.herokuapp.com/api/v1/trains/${train}/journeysections/`,
        {
          journeySectionDestinationUrl: `https://rls-backend.herokuapp.com/api/v1/locations/${end}`,
          journeySectionOriginUrl: `https://rls-backend.herokuapp.com/api/v1/locations/${start}`,
          livestockOrPeopleIndicator: 0,
        },
        httpOptions
      )
      .toPromise();
  }

  async updateJourneysections(id, object) {
    return await this.http
      .put(
        `https://rls-backend.herokuapp.com/api/v1/traincompositionjourneysections/${id}/`,
        object,
        httpOptions
      )
      .toPromise();
  }
}
