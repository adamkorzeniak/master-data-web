import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl  } from '@angular/forms';

import { IMovie } from '../model/movie';
import { MovieService } from '../service/movie-repository.service';
import { GenreService } from '../service/genre-repository.service';
import { IGenre } from '../model/genre';

// Allows to modify movie details
@Component({
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  public movieForm: FormGroup;
  public listDisplayed: boolean;
  protected movie: IMovie;
  protected allGenres: IGenre[];
  protected matchingGenres: IGenre[];
  protected searchedGenre: string;

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
    } else {
      this.pushEmptyGenre();
    }
    this.retrieveGenres();
  }

  public chooseGenre(index: number) {
    this.genres.controls.splice(-1, 1);
    this.pushGenre(index);
    this.clearGenreDropdown();
  }

  public addNewGenre() {
    this.genres.controls.splice(-1, 1);
    this.createGenre(this.searchedGenre);
    this.clearGenreDropdown();
  }

  public updateList(event: any) {
    this.listDisplayed = true;
    const genresList = this.genres.controls;
    this.searchedGenre = genresList[genresList.length - 1].value.name;
    this.matchingGenres = [];

    for (const genre of this.allGenres) {
      if (genre.name.toUpperCase().includes(this.searchedGenre.toUpperCase())) {
        this.matchingGenres.push(genre);
      }
    }
  }

  public removeGenre(index: number) {
    this.genres.controls.splice(index, 1);
  }

  public submitMovie(): void {
    const body = {...this.movie, ...this.movieForm.value};
    const genres: IGenre[] = [];

    this.genres.controls.splice(-1, 1);
    for (const c of this.genres.controls) {
      const genre: IGenre = c.value as IGenre;
      genres.push(genre);
    }
    this.pushEmptyGenre();
    body.genres = genres;
    if (this.movie && this.movie.id) {
      this.movieService.updateMovie(this.movie.id, body).subscribe(
        () => this.router.navigate(['/movies', this.movie.id ])
      );
    } else {
      this.movieService.createMovie(body).subscribe(
        (movie) => this.router.navigate(['/movies', movie.id ])
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
      movie => this.displayMovie(movie)
    );
  }

  private displayMovie(movie: IMovie): void {
    if (this.movieForm) {
      this.movieForm.reset();
    }
    this.movie = movie;
    this.initiateMovieDetails();
    this.initiateGenresDetails();
    this.pushEmptyGenre();
  }

  private initiateMovieDetails() {
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

  private initiateGenresDetails() {
    for (const genre of this.movie.genres) {
      this.genres.push(this.fb.group({
        id: { value: genre.id, disabled: true },
        name: { value: genre.name, disabled: true }
      }));
    }
  }

  private retrieveGenres(): void {
    this.genreService.getGenres().subscribe(
      genres => this.allGenres = genres
    );
  }

  private pushEmptyGenre() {
    this.genres.push(this.fb.group({
      id: null,
      name: null
    }));
  }

  private clearGenreDropdown() {
    this.listDisplayed = false;
    this.searchedGenre = '';
  }

  private createGenre(name: string) {
    const genre: IGenre = {
      id: null,
      name: name
    };
    this.genreService.createGenre(genre).subscribe(
      (g) => {
        this.genres.push(this.fb.group({
          id: { value: g.id, disabled: true },
          name: { value: g.name, disabled: true }
        }));
        this.pushEmptyGenre();
      }
    );
  }

  private pushGenre(i: number) {
    const genre = this.matchingGenres[i];
    this.genres.push(this.fb.group({
      id: { value: genre.id, disabled: true },
      name: { value: genre.name, disabled: true }
    }));
    this.pushEmptyGenre();
  }
}
