import { Component, OnInit } from "@angular/core";
import { TrainCompositionPathService } from "../../services/train-composition-path.service";
import { TrainCompositionService } from "src/app/services/train-composition.service";
import { ActivatedRoute } from "@angular/router";
import { DialogActivityPathComponent } from '../dialog-activity-path/dialog-activity-path.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: "app-element-path",
  templateUrl: "./element-path.component.html",
  styleUrls: ["./element-path.component.css"]
})
export class ElementPathComponent implements OnInit {
  public locationsList = null;
  public allActivityTypes;
  public copyId = null;
  public allPathItems = [];
  public activityTypesPath = {};
  public operationalTrainNumber = null;
  public tcmData = null;
  private sub: any;

  public pathItems = [];

  constructor(
    private pathService: TrainCompositionPathService,
    public tcmServie: TrainCompositionService,
    private route: ActivatedRoute,
    public dialog: MatDialog

  ) {
    pathService.allLocations().then((data: any) => {
      this.locationsList = data;
    });

    pathService.allActivityTypes().then((data: any) => {
      this.allActivityTypes = data;
    });

    tcmServie.loadTrain(this.route.snapshot.params.id).then((response: any) => {
      if (response.journeySections.length > 0) {
        response.journeySections.forEach(element => {
          const id = parseInt(element.id)
          const journeySectionOrigin = element.links.filter(item => item.rel === "journeySectionOrigin")[0];;
          const journeySectionDestination = element.links.filter(item => item.rel === "journeySectionDestination")[0];;

          this.allPathItems.push({
            uId: Date.now() + id,
            id: id,
            start: parseInt(
              journeySectionOrigin.href.substring(
                journeySectionOrigin.href.lastIndexOf("/") + 1,
                journeySectionOrigin.href.length
              )
            ),
            end: parseInt(
              journeySectionDestination.href.substring(
                journeySectionDestination.href.lastIndexOf("/") +
                  1,
                journeySectionDestination.href.length
              )
            ),
            activityType: "0001"
          });
        });
      } else {

        const transferPoint = response.links.filter(item => item.rel === "transferPoint")[0];

        this.allPathItems = [
          {
            uId: Date.now(),
            id: null,
            start: parseInt(
              transferPoint.href.substring(
                transferPoint.href.lastIndexOf("/") + 1,
                transferPoint.href.length
              )
            ),
            end: null,
            activityType: "0001"
          }
        ];
      }

    });
  }

  ngOnInit() {
    this.tcmServie.data$.subscribe(data => {
      this.tcmData = data;
    });
  }

  addTraject() {
    const itemBefore = this.allPathItems[this.allPathItems.length - 1];
    this.allPathItems.push({
      uId: Date.now(),
      id: null,
      start: itemBefore.end,
      end: null,
      activityType: "0001"
    });
  }

  deleteTraject(id) {
    const listIndex = this.allPathItems.findIndex(item => item.uId === id);

    if (this.allPathItems[listIndex + 1]) {
      this.allPathItems[listIndex + 1].start = this.allPathItems[
        listIndex - 1
      ].end;
    }

    this.allPathItems = this.allPathItems
      .slice(0, listIndex)
      .concat(this.allPathItems.slice(listIndex + 1, this.allPathItems.length));
  }

  updateEndLocation(id) {
    const listIndex = this.allPathItems.findIndex(item => item.uId === id);

    if (listIndex !== this.allPathItems.length - 1) {
      this.allPathItems[listIndex + 1].start = this.allPathItems[listIndex].end;
    }

    if (this.allPathItems[listIndex].id === null) {
      this.tcmServie
        .addJourneysections(
          this.allPathItems[listIndex].start,
          this.allPathItems[listIndex].end,
          this.tcmServie.currentId
        )
        .then((response: any) => {
          const journeyId = response.journeySections[response.journeySections.length - 1].id;
          this.allPathItems[listIndex].id = parseInt(journeyId);
        });
    } else {
      this.tcmServie.updateJourneysections(this.allPathItems[listIndex].id, {
        journeySectionDestination: `https://rls-backend.herokuapp.com/api/v1/locationidents/${this.allPathItems[listIndex].end}`
      })
    }
  }

  public copyComposition(id) {
    this.copyId = id;
  }
  public editComposition(id) {
    this.tcmServie.setActiveJourney(id);
  }

  public pasteComposition(id) {
    alert(`Paste composition ${this.copyId} to ${id}`);
    this.copyId = null;
  }

  setActivityType(id, value) {
    this.activityTypesPath[id] = value;
  }

  getLocation(locationPrimaryCode) {
    if (this.locationsList) {
      return this.locationsList.filter(
        item => locationPrimaryCode === item.locationPrimaryCode
      )[0];
    }

    return;
  }

  openDialogActivity(id){
    this.dialog.open(DialogActivityPathComponent);

  }
}
