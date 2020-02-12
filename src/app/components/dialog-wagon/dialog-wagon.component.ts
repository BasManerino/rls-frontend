import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { TraincompositiondetailsService } from 'src/app/services/traincompositiondetails.service';
import { MatDialogRef } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-wagon',
  templateUrl: './dialog-wagon.component.html',
  styleUrls: ['./dialog-wagon.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class DialogWagonComponent implements OnInit {

  public addedWagonIds = [];
  public totalWeight;
  public allWagonIds = [];
  public wagonList;
  public dangerIndex = 0;
  public dangerousGoodsList;
  public dangerousGoods = [];
  public wagonLoadIndex = -1;
  public wagonLoads = [];

  public wagonId;

  filteredOptions: Observable<string[]>;

  public newWagon = [
    {
      id: null,
      wagonLoads: null,
      type: 'wagon'
    }
  ];

  wagonNumber = new FormControl();
  wagonLoadWeight = new FormControl();
  wagonDangerousGood = new FormControl();

  wagonIdControl: FormGroup;
  wagonLoadControl: FormGroup;

  constructor(private tcService: TraincompositiondetailsService, public dialogLocoRef: MatDialogRef<DialogWagonComponent>,
              private fb: FormBuilder) {
    tcService.allWagons().then(data => {
      this.wagonList = data;
      this.getWagonNumbers();
    });
    tcService.dangerousGoodLabels().then(data => {
      this.dangerousGoodsList = data;
    });
  }

  ngOnInit() {
    // Filter for the autocomplete for wagonNumber
    this.filteredOptions = this.wagonNumber.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.wagonIdControl = this.fb.group({
      wagonNumber: ['', [
        Validators.required
      ]],
    });

    this.wagonLoadControl = this.fb.group({
      wagonLoads: this.fb.array([])
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    return this.allWagonIds.filter(option => option.toLowerCase().includes(filterValue));
  }

  addWagon() {
    if (this.checkDuplicates()) {
      this.newWagon.push({
        id: this.wagonId,
        wagonLoads: this.wagonLoads,
        type: 'Wagon',
      });
      this.tcService.saveComponent(this.newWagon[1]);
      this.addedWagonIds.push(this.wagonId);
      this.dialogLocoRef.close();
    } else {
      alert('Wagon: ' + this.wagonId + ' already exists in this composition!');
    }
  }

  checkDuplicates() {
    let duplicate;
    for (let id of this.allWagonIds) {
      if (this.wagonId !== id) {
        duplicate = true;
      } else {
        duplicate = false;
      }
    }
    return duplicate;
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
    this.wagonLoadsForms.removeAt(index);
  }

  showWagonLoads() {
    const list = this.wagonLoadControl.value;
    this.wagonLoads = list.wagonLoads;
    this.calcTotalWeight(this.wagonLoads);
  }

  calcTotalWeight(wagonLoads) {
    let emptyWagon;
    let loadWeight = 0;
    this.wagonList.forEach(wagon => {
      if (wagon.numberFreight === this.wagonId) {
        emptyWagon = wagon.wagonType.wagonWeightEmpty;
      }
    });
    for (let load of wagonLoads) {
      loadWeight += load.weight;
    }
    this.totalWeight = emptyWagon + loadWeight;
  }

  getWagonNumbers() {
    this.wagonList.forEach(wagon => {
      this.allWagonIds.push(wagon.numberFreight);
    });
  }

  getWagonId() {
    this.wagonId = ((document.getElementById('wagonInputId') as HTMLInputElement).value);
  }
}
