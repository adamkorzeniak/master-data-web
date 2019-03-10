import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CryptoListComponent } from './crypto-list/crypto-list.component';

const routes: Routes = [
  {
    path: 'crypto',
    component: CryptoListComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoRoutingModule {
}
