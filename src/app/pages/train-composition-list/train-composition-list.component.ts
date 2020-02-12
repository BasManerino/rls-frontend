import { Component, OnInit } from "@angular/core";
import { TrainCompositionService } from "src/app/services/train-composition.service";
import { DialogCreateTcmComponent } from "../../components/dialog-create-tcm/dialog-create-tcm.component";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-train-composition-list",
  templateUrl: "./train-composition-list.component.html",
  styleUrls: ["./train-composition-list.component.css"]
})
export class TrainCompositionListComponent implements OnInit {
  public allTcms = [];

  constructor(
    private tcmService: TrainCompositionService,
    public dialog: MatDialog,
    private router: Router
  ) {
    tcmService.allTrains().then((data: any) => {
      this.allTcms = data;
    });
  }

  ngOnInit() {}

  createTcm() {
    this.dialog.open(DialogCreateTcmComponent);
  }

  openTcm(tcm) {
    this.tcmService.setCurrentId(tcm.id);
    this.tcmService.setCurrentStartLocation(tcm.id);
    this.router.navigate([`/tcm/${tcm.id}`]);
  }
}
