import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { FormsModule } from '@angular/forms';
import { MinutesToHoursPipe } from './pipe/minutes-to-hours.pipe';

@NgModule({
  declarations: [
    StarComponent,
    MinutesToHoursPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    MinutesToHoursPipe,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
