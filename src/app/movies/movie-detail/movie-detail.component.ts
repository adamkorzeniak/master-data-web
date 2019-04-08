import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from '../model/movie';
import { MovieService } from '../service/movie-repository.service';

// Display details of movie, allows to delete movie details
@Component({
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  public movie: IMovie;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  public ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.retrieveMovie(id);
  }

  public deleteMovie(movie: IMovie) {
    if (confirm('Delete movie: ' + movie.title + ' (' + movie.year + ') ?')) {
      this.movieService.deleteMovie(movie.id).subscribe();
    }
  }

  private retrieveMovie(id: number): void {
    this.movieService.getMovie(id).subscribe(
      movie => this.movie = movie
    );
  }
}
