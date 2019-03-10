import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { ErrorRoutingModule } from './error-routing.module';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ErrorRoutingModule
  ],
  providers: []
})
export class ErrorModule { }
