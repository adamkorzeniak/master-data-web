import { Component, OnInit } from '@angular/core'
import { MovieService } from '../movie.service';
import { IMovie } from '../movie';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
    pageTitle: string = "Movie List";
    movies: IMovie[];
    movieSearchForm: FormGroup;
    isSearchVisible: boolean = false;
    errorMessage: string;
    movieSorting: string[] = ['', 'title', 'year', 'duration', "rating", "watchPriority"];
    sortingOrder: string[] = ['', 'asc', 'desc']

    ngOnInit(): void {
        this.movieService.getMovies().subscribe(
            movies => this.movies = movies,
            error => this.errorMessage = <any>error
        );

        this.movieSearchForm = this.fb.group({
            title: null,
            minYear: null,
            maxYear: null,
            minDuration: null,
            maxDuration: null,
            genres: null,
            minWatchPriority: null,
            maxWatchPriority: null,
            minRating: null,
            maxRating: null,
            description: null,
            order: null,
            sortingOrder: null
          })
    }

    constructor(private movieService: MovieService,
        private fb: FormBuilder) {
    }

    deleteMovie(index: number, movie: IMovie) {
        if (confirm("Delete movie: " + movie.title + " (" + movie.year + ") ?")) {
            this.movieService.deleteMovie(movie.id).subscribe(
                () => this.movies.splice(index, 1),
                error => console.log(error)
            )
        }
    }

    searchMovie(): void {
        console.log(JSON.stringify(this.movieSearchForm.value));
        const params = this.movieSearchForm.value;
        let isStarted = false;
        let queryParamString: string = "";
        if (params.title) {
            queryParamString += ((isStarted) ? "&" : "?") + "search-title=" + params.title;
            isStarted = true;
        }
        if (params.minYear != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "min-year=" + params.minYear;
            isStarted = true;
        }
        if (params.maxYear != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "max-year=" + params.maxYear;
            isStarted = true;
        }
        if (params.minDuration != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "min-duration=" + params.minDuration;
            isStarted = true;
        }
        if (params.maxDuration != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "max-duration=" + params.maxDuration;
            isStarted = true;
        }
        if (params.genres) {
            queryParamString += ((isStarted) ? "&" : "?") + "genres=" + params.genres;
            isStarted = true;
        }
        if (params.minWatchPriority != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "min-watchPriority=" + params.minWatchPriority;
            isStarted = true;
        }
        if (params.maxWatchPriority != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "max-watchPriority=" + params.maxWatchPriority;
            isStarted = true;
        }
        if (params.minRating != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "min-rating=" + params.minRating;
            isStarted = true;
        }
        if (params.maxRating != null) {
            queryParamString += ((isStarted) ? "&" : "?") + "max-rating=" + params.maxRating;
            isStarted = true;
        }
        if (params.description) {
            queryParamString += ((isStarted) ? "&" : "?") + "search-description=" + params.description;
            isStarted = true;
        }
        if (params.order) {
            queryParamString += ((isStarted) ? "&" : "?") + "order";
            if (params.sortingOrder) {
                queryParamString += "-" + params.sortingOrder;
            }
            queryParamString += "=" + params.order;
            isStarted = true;
        }
        console.log(queryParamString);
        this.movieService.searchMovies(queryParamString).subscribe(
            movies => this.movies = movies,
            error => this.errorMessage = <any>error
        );
    }
}