import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardComponent } from './flashcard.component';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'flashcards',
    component: FlashcardComponent,
    canActivate: [ AuthGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashcardRoutingModule {
}
