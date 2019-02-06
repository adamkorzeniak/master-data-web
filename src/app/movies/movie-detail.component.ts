import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMovie } from './movie';

@Component({
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  pageTitle: string = 'Movie Details';
  movie: IMovie;
  errorMessage: string;
  
  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id).subscribe(
      movie => this.movie = movie,
      error => this.errorMessage = <any>error
  );
  }

  onBack(): void {
    this.router.navigate(['movies']);
  }
}
