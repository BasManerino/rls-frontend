import { Component, OnInit } from "@angular/core";

import { MatDialogRef } from "@angular/material";
import { TrainCompositionPathService } from "src/app/services/train-composition-path.service";
import { TrainCompositionService } from "src/app/services/train-composition.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dialog-create-tcm",
  templateUrl: "./dialog-create-tcm.component.html",
  styleUrls: ["./dialog-create-tcm.component.css"]
})
export class DialogCreateTcmComponent implements OnInit {
  public trainId = null;
  public startLocation = null;
  public locationsList;

  constructor(
    private pathService: TrainCompositionPathService,
    private tcmService: TrainCompositionService,
    public dialogRef: MatDialogRef<DialogCreateTcmComponent>,
    private router: Router
  ) {
    pathService.allLocations().then((data: any) => {
      this.locationsList = data;
    });
  }

  ngOnInit() {}

  public submitDialog() {
    if (this.trainId === null || this.startLocation === null) {
      alert("Niet alle velden zijn ingevuld");
    }

    this.tcmService
      .createTrain(this.startLocation, this.trainId)
      .then((response: any) => {
        const id = response.id
        this.dialogRef.close();
        this.router.navigate([`/tcm/${id}`]);
      });
  }
}
