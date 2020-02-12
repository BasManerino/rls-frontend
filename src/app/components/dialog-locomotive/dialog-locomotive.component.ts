import { Component, OnInit } from '@angular/core';
import { TraincompositiondetailsService } from 'src/app/services/traincompositiondetails.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TrainServiceService } from 'src/app/services/train-service.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-dialog-locomotive',
  templateUrl: './dialog-locomotive.component.html',
  styleUrls: ['./dialog-locomotive.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})

export class DialogLocomotiveComponent implements OnInit {
  public compositionList;
  public locoId;
  public locoNumbers = [];
  public locomotiveList = [];
  public trainTypes = [];
  public tractionTypes = [];
  public driverIndication = [];

  locoTractionForm = new FormControl();
  locoNumber = new FormControl();
  locoDriver = new FormControl();
  filteredOptions: Observable<string[]>;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  public newLoco = [
    {
      id: null,
      type: 'Locomotive',
      tractionType: null,
      driver: null,
    }
  ];

  constructor(private tcService: TraincompositiondetailsService, private TrainService: TrainServiceService,
              public dialogLocoRef: MatDialogRef<DialogLocomotiveComponent>, private fb: FormBuilder) {
    tcService.allLocomotives().then((data: any) => {
      this.locomotiveList = data;
      this.getLoconumbers();
    });
    this.trainTypes = TrainService.getTrainTypes();
    this.tractionTypes = TrainService.getTractionTypes();
    this.driverIndication = TrainService.getDriverIndication();
  }

  ngOnInit() {
    // Filter for the autocomplete for locomotiveNumber
    this.filteredOptions = this.locoNumber.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    // Validationcheck for Steps of stepper
    this.firstFormGroup = this.fb.group({
      locoNumber: ['', Validators.required],
    });
    this.secondFormGroup = this.fb.group({
      locoTractionForm: ['', Validators.required]
    });
    this.thirdFormGroup = this.fb.group({
      locoDriver: ['', Validators.required]
    });

    this.tcService.updateComponent$.subscribe(message => {
      this.compositionList = message;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.locoNumbers.filter(option => option.toLowerCase().includes(filterValue));
  }

  getLocoId() {
    this.locoId = (document.getElementById('locoInputId') as HTMLInputElement).value;
  }

  addLocomotive() {
    if (!this.checkDuplicates()) {
      this.newLoco.push({
        id: this.locoId,
        type: 'Locomotive',
        tractionType: this.locoTractionForm.value,
        driver: this.locoDriver.value
      });
      console.log(this.newLoco[1]);
      this.tcService.saveComponent(this.newLoco[1]);
      this.dialogLocoRef.close();
    } else {
      alert('Locomotive: ' + this.locoId + ' already exists in this composition!');
    }
  }

  checkDuplicates() {
    console.log(this.compositionList);
    let duplicate;
    // console.log(this.addedIds);
    // if (this.addedIds.length > 0) {
    //   for (let id of this.addedIds) {
    //     console.log(id);
    //     if (this.locoId !== id) {
    //       duplicate = false;
    //     } else {
    //       duplicate = true;
    //     }
    //   }
    // } else {
    //   duplicate = false;
    // }
    console.log(this.locoId);
    console.log(duplicate);
    return duplicate;
  }

  getLoconumbers() {
    this.locomotiveList.forEach(locomotive => {
      this.locoNumbers.push(locomotive.locoNumber);
    });
  }
}
