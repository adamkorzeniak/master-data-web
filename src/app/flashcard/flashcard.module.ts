import { NgModule } from '@angular/core';
import { FlashcardComponent } from './flashcard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FlashcardRoutingModule } from './flashcard-routing.module';

@NgModule({
  declarations: [
    FlashcardComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    FlashcardRoutingModule
  ]
})
export class FlashcardModule { }
