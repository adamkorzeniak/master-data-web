import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { CryptoListComponent } from './crypto-list/crypto-list.component';
import { CryptoRoutingModule } from './crypto-routing.module';

@NgModule({
  declarations: [
    CryptoListComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    CryptoRoutingModule
  ]
})
export class CryptoModule { }
