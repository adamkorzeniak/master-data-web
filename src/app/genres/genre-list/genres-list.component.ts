import { Component, OnInit } from '@angular/core';
import { GenreService } from '../genre.service';
import { IGenre } from '../genre';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './genres-list.component.html',
  styleUrls: ['./genres-list.component.css']
})
export class GenresListComponent implements OnInit {
  genres: IGenre[];
  editedGenreId: number = -1;
  creating: boolean = false;
  genreSubmitForm: FormGroup;
  errorMessage: string;

  constructor(private genreService: GenreService,
    private fb: FormBuilder){}

  ngOnInit() {
    this.genreService.getGenres().subscribe(
      genres => this.genres = genres,
      error => this.errorMessage = <any>error
      );

      this.genreSubmitForm = this.fb.group({
        index: null,
        id: null,
        name: null
      })
  }

  create() {
    this.editedGenreId = -1;
    this.creating = true;
    this.genreSubmitForm.reset();
  }

  update(index: number, genre: IGenre) {
    this.editedGenreId = genre.id;
    this.creating = false;
    this.genreSubmitForm.setValue(
      {
        index: index,
        id: genre.id,
        name: genre.name
      }
    )
  }

  updateGenre() {
    let formValues = this.genreSubmitForm.value;
    let genre: IGenre = this.genres[formValues.index];
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

  createGenre() {

    const body = this.genreSubmitForm.value;
    this.genreService.createGenre(body).subscribe(
      (genre) => {
        this.genres.unshift(genre);
        this.creating =  false;
      },
      error => console.log(error)
    );
  }

  deleteGenre(index: number, genre: IGenre) {
    if (confirm("Delete genre: " + genre.name + " ?")) {
        this.genreService.deleteGenre(genre.id).subscribe(
            () => this.genres.splice(index, 1),
            error => console.log(error)
        )
    }
  }

}
