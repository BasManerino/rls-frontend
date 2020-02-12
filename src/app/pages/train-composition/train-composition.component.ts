import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { TrainCompositionService } from 'src/app/services/train-composition.service';

@Component({
  selector: "app-train-composition",
  templateUrl: "./train-composition.component.html",
  styleUrls: ["./train-composition.component.css"]
})
export class TrainCompositionComponent implements OnInit {
  id: number;
  private sub: any;

  constructor(private route: ActivatedRoute, private tcmService : TrainCompositionService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       this.tcmService.setCurrentId(this.id);

       this.tcmService.loadTrain(this.id).then((data: any) => {
        this.tcmService.setData(data);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
