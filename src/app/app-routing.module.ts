import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainCompositionListComponent } from './pages/train-composition-list/train-composition-list.component';
import { TrainCompositionComponent } from './pages/train-composition/train-composition.component';


const routes: Routes = [
  { path: '', component: TrainCompositionListComponent },
  { path: 'tcm/:id', component: TrainCompositionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
