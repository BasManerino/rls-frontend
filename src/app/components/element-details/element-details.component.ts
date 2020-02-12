import { Component, OnInit, ElementRef } from '@angular/core';
import { TraincompositiondetailsService } from 'src/app/services/traincompositiondetails.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { CdkDragDrop, moveItemInArray, CdkDragEnter } from '@angular/cdk/drag-drop';
import { DialogLocomotiveComponent } from '../dialog-locomotive/dialog-locomotive.component';
import { DialogWagonComponent } from '../dialog-wagon/dialog-wagon.component';
import { EditLocomotiveDialogComponent } from '../edit-locomotive-dialog/edit-locomotive-dialog.component';
import { EditWagonDialogComponent } from '../edit-wagon-dialog/edit-wagon-dialog.component';
import { TrainCompositionService } from 'src/app/services/train-composition.service';

@Component({
  selector: 'app-element-details',
  templateUrl: './element-details.component.html',
  styleUrls: ['./element-details.component.css']
})
export class ElementDetailsComponent implements OnInit {

  public locomotiveList;
  public wagonList;
  public componentList;
  public activeJourney = [];
  public compositionList = [];
  public detailList = [];
  public updatedComponent = [];
  public dangerGoodIndicator;
  public totalWeightWagon;

  constructor(private TCDService: TraincompositiondetailsService, private TCService: TrainCompositionService,
              public dialog: MatDialog) {
    TCDService.allLocomotives().then((data: any) => {
      this.locomotiveList = data;
    });
    TCDService.allWagons().then((data: any) => {
      this.wagonList = data;
    });
  }

  entered(event: CdkDragEnter) {
    moveItemInArray(this.compositionList, event.item.data, event.container.data);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.compositionList, event.previousIndex, event.currentIndex);
  }

  openLocoDialog() {
    this.dialog.open(DialogLocomotiveComponent, {
      height: '400px',
      width: '900px'
    }
    );
  }

  openWagonDialog() {
    this.dialog.open(DialogWagonComponent, {
      height: '400px',
      width: '900px'
    });
  }

  openEditDialog(type) {
    if (type === 'Locomotive') {
      for (let element of this.detailList) {
        let data = [];
        // ??? Beschrijving moet nog weggehaald worden ???
        data.push({
          id: element.id,
          description: element.description,
          trainType: element.trainType,
          tractionType: element.tractionType,
          driver: element.driver
        });
        this.TCDService.setSelectedDetails(data);
      }
      this.dialog.open(EditLocomotiveDialogComponent, {
        height: '400px',
        width: '900px'
      });
    } else {
      let wagonId;
      let wagonContent;
      for (let item of this.detailList) {
        wagonId = item.id;
        wagonContent = item.content;
        let data = [];
        data.push({
          id: item.id,
          wagonLoads: item.wagonLoads,
        });
        // ! Kan een goeie manier zijn om dit ook te doen met compositionList doorsturen bij aanmaken.
        this.TCDService.setSelectedDetails(data);
      }
      this.dialog.open(EditWagonDialogComponent, {
        height: '400px',
        width: '900px'
      });
    }
  }

  addComponent(message) {
    if (message.type === 'Locomotive') {
      this.addLocomotive();
    } else {
      this.addWagon();
    }
  }

  addLocomotive() {
    let toAdd = {};
    for (let item of this.locomotiveList) {
      if (this.componentList.id === item.locoNumber && this.componentList.id !== null && this.componentList.id !== '') {
        toAdd = {
          id: this.componentList.id,
          type: this.componentList.type,
          description: item.tractionMode.description,
          trainType: this.componentList.trainType,
          tractionType: this.componentList.tractionType,
          driver: this.componentList.driver
        };
        this.compositionList.push(toAdd);
        this.TCDService.setSavedComposition(this.compositionList);
      }
    }
    // }
    // else {
    //   this.dialog.closeAll();
    // }
  }

  addWagon() {
    let toAdd = {};
    if (this.componentList.id !== null && this.componentList.id !== '') {
      toAdd = {
        id: this.componentList.id,
        wagonLoads: this.componentList.wagonLoads,
        type: this.componentList.type
      };
    } else {
      // this.dialog.closeAll();
    }
    this.compositionList.push(toAdd);
    this.TCDService.setSavedComposition(this.compositionList);
  }

  update(data) {
    for (let i of this.compositionList) {
      if (i.type === 'Locomotive') {
        if (i.id === data[1].id) {
          // i.description = data[1].description;
          i.trainType = data[0].trainType;
          i.tractionType = data[0].tractionType;
          i.driver = data[0].driver;
          this.updateDetailList(data, i.type);
        }
      } else if (i.type === 'Wagon') {
        if (i.id === data.id) {
          this.updateDetailList(data[0], i.type);
        }
      }
    }
  }

  updateDetailList(data, type) {
    if (type === 'Locomotive') {
      this.detailList[0].description = data[1].description;
      this.detailList[0].trainType = data[0].trainType;
      this.detailList[0].tractionType = data[0].tractionType;
      this.detailList[0].driver = data[0].driver;
    } else if (type === 'Wagon') {
      if (this.detailList[0].wagonLoads.length > 0) {
        this.detailList[0].dangerousGoods = 'Yes';
        this.dangerGoodIndicator = 'Yes';
      } else {
        this.detailList[0].dangerousGoods = 'No';
        this.dangerGoodIndicator = 'No';
      }
    }
  }

  showDetails(itemId, itemType) {
    if (itemType === 'Locomotive') {
      let locoInfo = [];
      for (let element of this.compositionList) {
        if (element.id === itemId) {
          locoInfo.push({
            id: itemId,
            description: element.description,
            type: element.type,
            trainType: element.trainType,
            tractionType: element.tractionType,
            driver: element.driver
          });
        }
        this.detailList = locoInfo;
      }
    } else {
      let weightEmpty;
      let wagonLengthOverBuffers;
      let wagonNumberOfAxles;

      this.wagonList.forEach(element => {
        if (element.numberFreight === itemId) {
          weightEmpty = element.wagonType.wagonWeightEmpty;
          this.totalWeightWagon = weightEmpty;
          wagonLengthOverBuffers = element.wagonType.lengthOverBuffers;
          wagonNumberOfAxles = element.wagonType.wagonNumberOfAxles;
        }
      });
      let wagonInfo = [];
      for (let element of this.compositionList) {
        if (element.id === itemId) {
          this.checkDangerousGoods(element);
          this.calcTotalWeightWagon(element);
          wagonInfo.push({
            id: itemId,
            wagonLoads: element.wagonLoads,
            dangerousGoods: this.dangerGoodIndicator,
            type: element.type,
            wagonWeightEmpty: weightEmpty,
            lengthOverBuffers: wagonLengthOverBuffers,
            numberOfAxles: wagonNumberOfAxles
          });
        }
        this.detailList = wagonInfo;
      }
    }
  }

  calcTotalWeightWagon(element) {
    let wagonLoadWeight;
    if (element.wagonLoads.length > 0) {
      for (let load of element.wagonLoads) {
        if (wagonLoadWeight) {
          wagonLoadWeight += load.weight;
        } else {
          wagonLoadWeight = load.weight;
        }
      }
      this.totalWeightWagon += wagonLoadWeight;
    }
  }

  checkDangerousGoods(element) {
    if (element.wagonLoads.length === 0) {
      this.dangerGoodIndicator = 'No';
    } else {
      this.dangerGoodIndicator = 'Yes';
    }
  }

  saveComposition() {
    this.TCDService.setSavedComposition(this.compositionList);
  }

  removeElement(id) {
    if (this.detailList[0].id === id) {
      this.detailList.splice(0, 1);
    }
    let index = 0;
    for (let item of this.compositionList) {
      let itemId = item.id;
      if (itemId === id) {
        this.compositionList.splice(index, 1);
      }
      index += 1;
    }
  }

  moveElementUp(index) {
    var temp = this.compositionList[index];

    this.compositionList[index] = this.compositionList[index - 1];
    this.compositionList[index - 1] = temp;
  }

  moveElementDown(index) {
    var temp = this.compositionList[index];

    this.compositionList[index] = this.compositionList[index + 1];
    this.compositionList[index + 1] = temp;
  }

  ngOnInit() {
    this.TCDService.component$.subscribe(message => {
      this.componentList = message;
      this.addComponent(message);
    });

    this.TCDService.updateComponent$.subscribe(message => {
      this.updatedComponent = message;
      this.update(message);
    });

    this.TCService.activeJourney$.subscribe(message => {
      this.activeJourney = message;
    });
  }
}
