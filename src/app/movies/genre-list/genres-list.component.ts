import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { IGenre } from '../model/genre';
import { GenreService } from '../service/genre-repository.service';

// Component used to
//  Display list of genres
//  Modify genre
//  Create genre
//  Remove genre
@Component({
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {
  private genres: IGenre[];
  private editedGenreId = -1;
  private creating = false;
  private genreSubmitForm: FormGroup;

  constructor(
    private genreService: GenreService,
    private fb: FormBuilder) {}

  public ngOnInit() {
    this.retrieveGenres();
    this.buildGenreSubmitForm();
  }

  public addGenreElement() {
    this.editedGenreId = -1;
    this.creating = true;
    this.genreSubmitForm.reset();
  }

  public updateGenreElement(i: number, genre: IGenre) {
    this.editedGenreId = genre.id;
    this.creating = false;
    this.genreSubmitForm.setValue(
      {
        index: i,
        id: genre.id,
        name: genre.name
      }
    );
  }

  public updateGenre() {
    const formValues = this.genreSubmitForm.value;
    const genre: IGenre = this.genres[formValues.index];
    this.genres[formValues.index].name = formValues.name;
    this.editedGenreId = -1;
    const body = {...genre, ...formValues};
    this.genreService.updateGenre(genre.id, body).subscribe(
      () => {
        this.genres[formValues.index].name = formValues.name;
        this.editedGenreId = -1;
      },
      error => console.log(error)
    );
  }

  public createGenre() {
    const body = this.genreSubmitForm.value;
    this.genreService.createGenre(body).subscribe(
      (genre) => {
        this.genres.unshift(genre);
        this.creating =  false;
      },
      error => console.log(error)
    );
  }

  public deleteGenre(index: number, genre: IGenre) {
    if (confirm('Delete genre: ' + genre.name + ' ?')) {
        this.genreService.deleteGenre(genre.id).subscribe(
            () => this.genres.splice(index, 1),
            error => console.log(error)
        );
    }
  }

  private retrieveGenres(): void {
    this.genreService.getGenres().subscribe(
      genres => this.genres = genres,
      null
    );
  }

  private buildGenreSubmitForm(): void {
    this.genreSubmitForm = this.fb.group({
      index: null,
      id: null,
      name: null
    });
  }
}
