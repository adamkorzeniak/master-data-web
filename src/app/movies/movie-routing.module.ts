import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { GenresListComponent } from '../genres/genre-list/genres-list.component';
import { MovieDetailGuard } from './movie-detail/movie-detail.guard';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieListComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'movies/create',
    component: MovieEditComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent,
    canActivate: [ AuthGuard, MovieDetailGuard ]
  },
  {
    path: 'movies/:id/edit',
    canActivate: [ AuthGuard, MovieDetailGuard ],
    component: MovieEditComponent
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
