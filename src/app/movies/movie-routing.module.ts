import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { GenresListComponent } from '../movies/genre-list/genres-list.component';
import { MovieActivateGuard } from './guard/movie.guard';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { AuthGuard } from '../auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'movies/create',
    component: MovieEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
    canActivate: [ AuthGuard, MovieActivateGuard ]
  },
  {
    path: 'movies/:id/edit',
    component: MovieEditComponent,
    canActivate: [ AuthGuard, MovieActivateGuard ]
  },
  {
    path: 'genres',
    component: GenresListComponent,
    canActivate: [ AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
