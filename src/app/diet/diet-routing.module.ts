import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { DiaryComponent } from './diary/diary.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'diary',
    component: DiaryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DietRoutingModule {
}
