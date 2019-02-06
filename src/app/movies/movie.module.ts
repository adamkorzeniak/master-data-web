import { NgModule } from '@angular/core';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { ConvertMovieGenrePipe } from './movie-genre.pipe';
import { GenresListComponent } from '../genres/genres-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieEditComponent } from './movie-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    GenresListComponent,
    ConvertMovieGenrePipe,
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
