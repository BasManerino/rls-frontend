import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { TrainCompositionPathService } from 'src/app/services/train-composition-path.service';

@Component({
  selector: "app-dialog-activity-path",
  templateUrl: "./dialog-activity-path.component.html",
  styleUrls: ["./dialog-activity-path.component.css"]
})
export class DialogActivityPathComponent implements OnInit {
  public allActivityTypes;

  constructor(
    public dialogRef: MatDialogRef<DialogActivityPathComponent>,
    private pathService: TrainCompositionPathService
  ) {
    pathService.allActivityTypes().then((data: any) => {
      this.allActivityTypes = data;
    });
  }

  ngOnInit() {}
}
