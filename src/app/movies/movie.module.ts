import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { GenresListComponent } from '../movies/genre-list/genres-list.component';
import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { ConvertMovieGenrePipe } from './pipe/movie-genre.pipe';
import { WatchPriorityPipe } from './pipe/movie-watch-priority.pipe';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    GenresListComponent,
    ConvertMovieGenrePipe,
    WatchPriorityPipe,
    MovieEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MovieRoutingModule,
    ReactiveFormsModule
  ]
})
export class MovieModule { }
