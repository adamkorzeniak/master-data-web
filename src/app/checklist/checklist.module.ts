import { NgModule } from '@angular/core';
import { ChecklistComponent } from './checklist.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ChecklistRoutingModule } from './checklist-routing.module';

@NgModule({
  declarations: [
    ChecklistComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ChecklistRoutingModule
  ]
})
export class ChecklistModule { }
