import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary/diary.component';
import { DietRoutingModule } from './diet-routing.module';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DiaryComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    DietRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DietModule { }
