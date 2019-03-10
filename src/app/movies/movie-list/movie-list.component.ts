import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IMovie } from '../model/movie';
import { MovieService } from '../service/movie-repository.service';

// Display all movies and allows to search for movies
@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  protected movies: IMovie[];
  protected movieSearchForm: FormGroup;
  protected isSearchVisible = false;
  protected movieSorting: string[] = ['', 'title', 'year', 'duration', 'rating', 'watchPriority'];
  protected sort: string[] = ['', 'asc', 'desc'];
  protected urlParams: any;
  private queryParams: any;

  constructor(
    private movieService: MovieService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.urlParams = this.retrieveQueryParams();
    this.buildMovieSearchForm();
    this.initiateSearch();
  }

  protected resetForm() {
    this.movieSearchForm.reset();
  }

  protected initiateSearch(): void {
    this.resetParams();
    this.buildParams();
    this.searchMovie();
    this.updateUrl();
  }

  protected deleteMovie(index: number, movie: IMovie) {
    const message = 'Delete movie: ' + movie.title + ' (' + movie.year + ') ?';
    if (confirm(message)) {
      this.movieService.deleteMovie(movie.id).subscribe(
        () => this.movies.splice(index, 1)
      );
    }
  }

  private searchMovie() {
    this.movieService.queryMovies(this.queryParams).subscribe(
      movies => this.movies = movies
    );
  }

  private retrieveQueryParams() {
    const params = this.route.snapshot.queryParamMap;
    const result = {};
    const keys = params.keys;
    const paramSize = keys.length;
    for (let i = 0; i < paramSize; i++) {
      result[keys[i]] = params.get(keys[i]);
    }
    return result;
  }

  private buildMovieSearchForm(): void {
    this.movieSearchForm = this.fb.group({
      title: this.urlParams.title,
      minYear: this.urlParams.minYear,
      maxYear: this.urlParams.maxYear,
      minDuration: this.urlParams.minDuration,
      maxDuration: this.urlParams.maxDuration,
      genres: this.urlParams.genres,
      minWatchPriority: this.urlParams.minWatchPriority,
      maxWatchPriority: this.urlParams.maxWatchPriority,
      minRating: this.urlParams.minRating,
      maxRating: this.urlParams.maxRating,
      description: this.urlParams.description,
      order: this.urlParams.description,
      sort: this.urlParams.sort
    });
  }

  private resetParams() {
    this.urlParams = {};
    this.queryParams = {};
    this.updateUrl();
  }

  private buildParams() {
    const params = this.movieSearchForm.value;
    if (params.title) {
      this.urlParams['title'] = params.title;
      this.queryParams['search-title'] = params.title;
    }
    if (params.minYear != null) {
      this.urlParams['minYear'] = params.minYear;
      this.queryParams['min-year'] = params.minYear;
    }
    if (params.maxYear != null) {
      this.urlParams['maxYear'] = params.maxYear;
      this.queryParams['max-year'] = params.maxYear;
    }
    if (params.minDuration != null) {
      this.urlParams['minDuration'] = params.minDuration;
      this.queryParams['min-duration'] = params.minDuration;
    }
    if (params.maxDuration != null) {
      this.urlParams['maxDuration'] = params.maxDuration;
      this.queryParams['max-duration'] = params.maxDuration;
    }
    if (params.genres) {
      this.urlParams['genres'] = params.genres;
      this.queryParams['genres'] = params.genres;
    }
    if (params.minWatchPriority != null) {
      this.urlParams['minWatchPriority'] = params.minWatchPriority;
      this.queryParams['min-watchPriority'] = params.minWatchPriority;
    }
    if (params.maxWatchPriority != null) {
      this.urlParams['maxWatchPriority'] = params.maxWatchPriority;
      this.queryParams['max-watchPriority'] = params.maxWatchPriority;
    }
    if (params.minRating != null) {
      this.urlParams['minRating'] = params.minRating;
      this.queryParams['min-rating'] = params.minRating;
    }
    if (params.maxRating != null) {
      this.urlParams['maxRating'] = params.maxRating;
      this.queryParams['max-rating'] = params.maxRating;
    }
    if (params.description) {
      this.urlParams['description'] = params.description;
      this.queryParams['search-description'] = params.description;
    }
    if (params.order) {
      this.urlParams['order'] = params.order;
      this.urlParams['sort'] = params.sort;
      const queryOrderKey = (params.sort) ? 'order-' + params.sort : 'order';
      this.queryParams[queryOrderKey] = params.order;
      if (params.sort) {
        this.urlParams['sort'] = params.sort;
      }
    }
  }

  private updateUrl() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.urlParams
      }
    );
  }
}
