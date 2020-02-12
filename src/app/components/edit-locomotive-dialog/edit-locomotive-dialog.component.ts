import { Component, OnInit } from '@angular/core';
import { TraincompositiondetailsService } from 'src/app/services/traincompositiondetails.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { TrainServiceService } from 'src/app/services/train-service.service';

@Component({
  selector: 'app-edit-locomotive-dialog',
  templateUrl: './edit-locomotive-dialog.component.html',
  styleUrls: ['./edit-locomotive-dialog.component.css']
})
export class EditLocomotiveDialogComponent implements OnInit {

  locoDescFormControl = new FormControl('', [Validators.required]);
  locoTrainTypeFormControl = new FormControl('', [Validators.required]);
  locoTractionTypeFormControl = new FormControl('', [Validators.required]);
  locoDriverFormControl = new FormControl('', [Validators.required]);

  editLocomotiveForm: FormGroup = new FormGroup({
    locoDescCheck: this.locoDescFormControl,
    locoTrainTypeCheck: this.locoTrainTypeFormControl,
    locoTractionTypeCheck: this.locoTractionTypeFormControl,
    locoDriverCheck: this.locoDriverFormControl
  });

  public selectedData;
  public locoId;
  public trainTypes = [];
  public tractionTypes = [];
  public driverIndication = [];

  public updatedLoco = [
    {
      id: null,
      // description: null,
      tractionType: null,
      driver: null
    }
  ];

  constructor(private tcService: TraincompositiondetailsService, private TrainService: TrainServiceService,
              public dialogEditLoco: MatDialogRef<EditLocomotiveDialogComponent>) {
    this.selectedData = tcService.getSelectedDetails();
    this.trainTypes = TrainService.getTrainTypes();
    this.tractionTypes = TrainService.getTractionTypes();
    this.driverIndication = TrainService.getDriverIndication();
    this.updatedLoco = this.selectedData;
  }

  updateDetails() {
    // let locoDesc = (document.getElementById('description') as HTMLInputElement).value;
    this.updatedLoco.push({
      id: this.locoId,
      // description: locoDesc,
      tractionType: null,
      driver: null
    });
    this.tcService.updateDetails(this.updatedLoco);
    this.dialogEditLoco.close();
  }

  ngOnInit() {
    for (let item of this.selectedData) {
      this.locoId = item.id;
    }
  }
}
