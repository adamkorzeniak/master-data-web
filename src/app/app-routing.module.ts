import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MovieListComponent } from './movies/movie-list.component';

const routes: Routes = [
  {path: '', component: MovieListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
