import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { IMovie } from '../model/movie';
import { MovieService } from '../service/movie-repository.service';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
  private pageTitle = 'Movie List';
  private movies: IMovie[];
  private movieSearchForm: FormGroup;
  private isSearchVisible = false;
  private errorMessage: string;
  private movieSorting: string[] = ['', 'title', 'year', 'duration', 'rating', 'watchPriority'];
  private sort: string[] = ['', 'asc', 'desc'];
  private urlParams: any;
  private queryParams: any;

  constructor(
    private movieService: MovieService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.urlParams = this.retrieveQueryParams();

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

    this.searchMovie();
  }

  public retrieveQueryParams() {
    const params = this.route.snapshot.queryParamMap;
    const result = {};
    const keys = params.keys;
    const paramSize = keys.length;
    for (let i = 0; i < paramSize; i++) {
      result[keys[i]] = params.get(keys[i]);
    }
    return result;
  }

  public resetForm() {
    this.movieSearchForm.reset();
  }

  public deleteMovie(index: number, movie: IMovie) {
      if (confirm('Delete movie: ' + movie.title + ' (' + movie.year + ') ?')) {
          this.movieService.deleteMovie(movie.id).subscribe(
              () => this.movies.splice(index, 1),
              error => console.log(error)
          );
      }
  }

  public resetParams() {
    this.urlParams = {};
    this.queryParams = {};
    this.updateUrl();
  }

  public buildParams() {
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

  public updateUrl() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.urlParams
      });

    console.log(this.queryParams);
    console.log(this.urlParams);
  }

  public searchMovie() {
    this.movieService.queryMovies(this.queryParams).subscribe(
      movies => this.movies = movies,
      error => this.errorMessage = error
    );
  }

  public initiateSearch(): void {
    console.log(JSON.stringify(this.movieSearchForm.value));
    this.resetParams();
    this.buildParams();
    this.searchMovie();
    this.updateUrl();
  }
}
