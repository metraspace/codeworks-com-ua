import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '@app/app.component';
import {
  AddNewGridItemComponent,
  ColorViewComponent,
  GridComponent,
  OverviewComponent,
  TimerComponent,
  VisualizerComponent
} from '@app/components';

@NgModule({
  declarations: [
    AppComponent,
    AddNewGridItemComponent,
    GridComponent,
    ColorViewComponent,
    OverviewComponent,
    TimerComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
