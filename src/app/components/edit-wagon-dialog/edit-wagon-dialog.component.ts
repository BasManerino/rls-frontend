import { Component, OnInit } from '@angular/core';
import { TraincompositiondetailsService } from 'src/app/services/traincompositiondetails.service';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-wagon-dialog',
  templateUrl: './edit-wagon-dialog.component.html',
  styleUrls: ['./edit-wagon-dialog.component.css']
})
export class EditWagonDialogComponent implements OnInit {

  public wagonId;
  public selectedWagon;
  public dangerousGoodsList;
  public wagonLoads = [];
  public dangerLabel;

  wagonLoadControl: FormGroup;
  existingWagonControl: FormGroup;

  public updatedWagon = [
    {
      id: null,
      wagonLoads: null
    }
  ];

  constructor(private tcService: TraincompositiondetailsService, public dialogEditWagon: MatDialogRef<EditWagonDialogComponent>,
              private fb: FormBuilder) {
    this.selectedWagon = tcService.getSelectedDetails();
    tcService.dangerousGoodLabels().then((data: any) => {
      this.dangerousGoodsList = data;
    });
    this.updatedWagon = this.selectedWagon;
  }



  ngOnInit() {
    for (let item of this.selectedWagon) {
      this.wagonId = item.id;
    }
    this.existingWagonControl = this.fb.group({
      weight: [''],
      dangerGoods: ['']
    })

    this.wagonLoadControl = this.fb.group({
      wagonLoads: this.fb.array([])
    });
  }

  get wagonLoadsForms() {
    return this.wagonLoadControl.get('wagonLoads') as FormArray;
  }

  addWagonLoad() {
    const wagonLoad = this.fb.group({
      weight: [],
      dangerGoods: [],
    });
    this.wagonLoadsForms.push(wagonLoad);
  }

  deleteWagonLoad(index) {
    this.selectedWagon.forEach(wagon => {
      wagon.wagonLoads.splice(index, 1);
    });
  }

  deleteNewWagonLoad(index) {
    this.wagonLoadsForms.removeAt(index);
  }

  updateWagon() {
    let loads;
    let existingLoad;
    this.updatedWagon.push({
      id: this.wagonId,
      wagonLoads: null,
    });
    loads = this.wagonLoadControl.value;
    existingLoad = this.updatedWagon[0];
    if (loads.wagonLoads.length > 0) {
      for (let load of loads.wagonLoads) {
        existingLoad.wagonLoads.push(load);
      }
      this.tcService.updateDetails(existingLoad);
    } else {
      this.tcService.updateDetails(this.updatedWagon[0]);
    }
    this.selectedWagon = [];
    this.dialogEditWagon.close();
  }
}
