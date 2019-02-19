import { NgModule } from '@angular/core';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { ConvertMovieGenrePipe } from './pipes/movie-genre.pipe';
import { WatchPriorityPipe } from './pipes/movie-watch-priority.pipe';
import { GenresListComponent } from '../genres/genre-list/genres-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login.component';

@NgModule({
  declarations: [
    MovieListComponent,
    LoginComponent,
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
