import { Component, OnInit } from '@angular/core';
import { IMovie } from '../movie';
import { MovieService } from '../movie.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder  } from '@angular/forms';

@Component({
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movie: IMovie;
  movieForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.movieForm = this.fb.group({
      title: [null, Validators.required],
      year: [null, [Validators.min(1800), Validators.max(2100)]],
      duration: null,
      description: null,
      // genres: null,
      watchPriority: null,
      rating: null,
      review: null,
      plotSummary: null,
      reviewDate: null
    });

    if (id > 0) {
      this.movieService.getMovie(id).subscribe(
        movie => this.displayMovie(movie),
        error => console.log(error)
      );
    }
  }

  displayMovie(movie: IMovie): void {
    if (this.movieForm) {
      this.movieForm.reset();
    }
    this.movie = movie;

    this.movieForm.patchValue({
      title: this.movie.title,
      year: this.movie.year,
      duration: this.movie.duration,
      description: this.movie.description,
      watchPriority: this.movie.watchPriority,
      rating: this.movie.rating,
      review: this.movie.review,
      plotSummary: this.movie.plotSummary,
      reviewDate: this.movie.reviewDate
    });
  }

  submitMovie(): void {
    console.log(JSON.stringify(this.movieForm.value));
    const body = {...this.movie, ...this.movieForm.value};
    console.log(JSON.stringify(body));
    if (this.movie && this.movie.id) {
      this.movieService.updateMovie(this.movie.id, body).subscribe(
        () => this.router.navigate(['/movies', this.movie.id ]),
        error => console.log(error)
      );
    } else {
      this.movieService.createMovie(body).subscribe(
        (movie) => this.router.navigate(['/movies', movie.id ]),
        error => console.log(error)
      );

    }
  }

}
