import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl  } from '@angular/forms';

import { IMovie } from '../model/movie';
import { MovieService } from '../service/movie-repository.service';
import { GenreService } from '../service/genre-repository.service';

// Allows to modify movie details
@Component({
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  private movie: IMovie;
  private movieForm: FormGroup;
  private matchingGenres: any[];
  private allowedGenres: any[];
  private listDisplayed = false;
  private searchedGenre: string;

  constructor(
    private movieService: MovieService,
    private genreService: GenreService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) { }

  get genres(): FormArray { return this.movieForm.get('genres') as FormArray; }

  public ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.buildMovieForm();
    if (id > 0) {
      this.retrieveMovie(id);
      this.retrieveGenres();
    }
  }

  public chooseGenre(index: number) {
    this.genres.removeAt(index);
    const genre = this.matchingGenres[index];
    this.genres.push(this.fb.group({
      id: { value: genre.id, disabled: true },
      name: { value: genre.name, disabled: true }
    }));

    this.genres.push(this.fb.group({
      id: null,
      name: null
      }));
    }

  public addNewGenre() {
    const index = this.genres.controls.length - 1;
    this.genres.removeAt(index);
    this.genres.push(this.fb.group({
      id: { value: null, disabled: true },
      name: { value: this.searchedGenre, disabled: true }
    }));
    this.genres.push(this.fb.group({
      id: null,
      name: null
    }));
  }

  public updateList(event: any) {
    this.listDisplayed = true;
    const genresList = this.genres.controls;
    this.searchedGenre = genresList[genresList.length - 1].value.name;
    console.log(this.searchedGenre);
    this.matchingGenres = [];

    for (const genre of this.allowedGenres) {
      if (genre.name.toUpperCase().includes(this.searchedGenre.toUpperCase())) {
        this.matchingGenres.push(genre);
      }
    }
    console.log(this.matchingGenres);
  }

  public removeGenre(index: number) {
    this.genres.removeAt(index);
  }

  public displayMovie(movie: IMovie): void {
    if (this.movieForm) {
      this.movieForm.reset();
    }
    this.movie = movie;

    for (const genre of movie.genres) {
      this.genres.push(this.fb.group({
        id: { value: genre.id, disabled: true },
        name: { value: genre.name, disabled: true }
      }));
    }

    this.genres.push(this.fb.group({
      id: null,
      name: null
    }));

    this.movieForm.patchValue({
      title: this.movie.title,
      year: this.movie.year,
      duration: this.movie.duration,
      description: this.movie.description,
      genres: this.movie.genres,
      watchPriority: this.movie.watchPriority,
      rating: this.movie.rating,
      review: this.movie.review,
      plotSummary: this.movie.plotSummary,
      reviewDate: this.movie.reviewDate
    });
  }

  public submitMovie(): void {
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

  private buildMovieForm(): void {
    this.movieForm = this.fb.group({
      title: [null, Validators.required],
      year: [null, [Validators.min(1800), Validators.max(2100)]],
      duration: null,
      description: null,
      genres: this.fb.array([]),
      watchPriority: null,
      rating: null,
      review: null,
      plotSummary: null,
      reviewDate: null
    });
  }

  private retrieveMovie(id: number): void {
    this.movieService.getMovie(id).subscribe(
      movie => this.displayMovie(movie),
      error => console.log(error)
    );
  }

  private retrieveGenres(): void {
    this.genreService.getGenres().subscribe(
      genres => this.allowedGenres = this.matchingGenres = genres,
      error => console.log(error)
    );
  }

}
