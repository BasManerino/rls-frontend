import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ElementDetailsComponent } from "./components/element-details/element-details.component";
import { TrainCompositionComponent } from "./pages/train-composition/train-composition.component";
import { ElementPathComponent } from "./components/element-path/element-path.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogWagonComponent } from "./components/dialog-wagon/dialog-wagon.component";
import { DialogLocomotiveComponent } from "./components/dialog-locomotive/dialog-locomotive.component";
import {
  MatCardModule,
  MatSelectModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatDialogModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatStepperModule
} from "@angular/material";
import { TextFieldModule } from "@angular/cdk/text-field";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FlexLayoutModule } from "@angular/flex-layout";
import { EditWagonDialogComponent } from "./components/edit-wagon-dialog/edit-wagon-dialog.component";
import { EditLocomotiveDialogComponent } from "./components/edit-locomotive-dialog/edit-locomotive-dialog.component";
import { DialogCreateTcmComponent } from "./components/dialog-create-tcm/dialog-create-tcm.component";
import { TrainCompositionListComponent } from "./pages/train-composition-list/train-composition-list.component";
import { DialogActivityPathComponent } from './components/dialog-activity-path/dialog-activity-path.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    AppComponent,
    ElementDetailsComponent,
    TrainCompositionComponent,
    DialogWagonComponent,
    DialogLocomotiveComponent,
    ElementPathComponent,
    EditWagonDialogComponent,
    EditLocomotiveDialogComponent,
    TrainCompositionListComponent,
    DialogCreateTcmComponent,
    DialogActivityPathComponent,
  ],
  entryComponents: [
    DialogLocomotiveComponent,
    DialogWagonComponent,
    EditLocomotiveDialogComponent,
    EditWagonDialogComponent,
    DialogCreateTcmComponent,
    DialogActivityPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    TextFieldModule,
    DragDropModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatStepperModule
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
