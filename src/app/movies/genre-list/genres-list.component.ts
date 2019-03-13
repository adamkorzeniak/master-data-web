import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { IGenre } from '../model/genre';
import { GenreService } from '../service/genre-repository.service';
import { Router } from '@angular/router';

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
  public genres: IGenre[];
  public editedGenreId = -1;
  public creating = false;
  protected genreSubmitForm: FormGroup;

  constructor(
    private genreService: GenreService,
    private fb: FormBuilder,
    private router: Router) {}

  public ngOnInit() {
    this.retrieveGenres();
    this.buildGenreSubmitForm();
  }

  public deleteGenre(index: number, genre: IGenre) {
    const message = 'Delete genre: ' + genre.name + ' ?';
    if (confirm(message)) {
      this.genreService.deleteGenre(genre.id).subscribe(
        () => this.genres.splice(index, 1)
      );
    }
  }

  public addGenreElement(): void {
    this.editedGenreId = -1;
    this.creating = true;
    this.genreSubmitForm.reset();
  }

  public updateGenreElement(index: number, genre: IGenre): void {
    this.editedGenreId = genre.id;
    this.creating = false;
    this.setFormValues(index, genre);
  }

  public discardGenreElement() {
    this.genreSubmitForm.reset();
    this.editedGenreId = -1;
    this.creating =  false;
  }

  protected searchMovies(genreName: string): void {
    this.router.navigate(['/movies'], {
      queryParams: { genres: genreName }
    });
  }

  protected updateGenre() {
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

  protected createGenre() {
    const body = this.genreSubmitForm.value;
    this.genreService.createGenre(body).subscribe(
      (genre) => {
        this.genres.unshift(genre);
        this.creating =  false;
      }
    );
  }

  private setFormValues(index: number, genre: IGenre) {
    this.genreSubmitForm.setValue(
      {
        index: index,
        id: genre.id,
        name: genre.name
      }
    );
  }

  private retrieveGenres(): void {
    this.genreService.getGenres().subscribe(
      genres => this.genres = genres
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
