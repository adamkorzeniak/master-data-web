import { Component, OnInit } from '@angular/core';
import { GenreService } from './genre.service';
import { IGenre } from './genre';

@Component({
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {
  pageTitle: string = "Genres List";
  genres: IGenre[];
  errorMessage: string;

  constructor(private genreService: GenreService){}

  ngOnInit() {
    this.genreService.getGenres().subscribe(
      genres => this.genres = genres,
      error => this.errorMessage = <any>error
      );
  }

}
