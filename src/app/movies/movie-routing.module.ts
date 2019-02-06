import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { GenresListComponent } from '../genres/genres-list.component';
import { MovieDetailGuard } from './movie-detail.guard';
import { MovieEditComponent } from './movie-edit.component';

const routes: Routes = [
  {path: 'movies', component: MovieListComponent},
  {path: 'movies/create',
    component: MovieEditComponent},
  {path: 'movies/:id',
    canActivate: [ MovieDetailGuard ],
    component: MovieDetailComponent},
  {path: 'movies/:id/edit',
    canActivate: [ MovieDetailGuard ],
    component: MovieEditComponent},
  {path: 'genres', component: GenresListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { 
}
