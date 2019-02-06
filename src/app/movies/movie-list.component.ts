import { Component, OnInit } from '@angular/core'
import { MovieService } from './movie.service';
import { IMovie } from './movie';

@Component({
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
    pageTitle: string = "Movie List";
    movies: IMovie[];
    errorMessage: string;

    onRatingClicked(message: string): void {
        alert(message);
    }

    ngOnInit(): void {
        this.movieService.getMovies().subscribe(
            movies => this.movies = movies,
            error => this.errorMessage = <any>error
        );
    }

    constructor(private movieService: MovieService) {
    }

    deleteMovie(id: number) {
        this.movieService.deleteMovie(id).subscribe(
            movie => console.log(JSON.stringify(movie)),
            error => console.log(error)
        )
    }
}