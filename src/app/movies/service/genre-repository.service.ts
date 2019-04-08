import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IGenre } from '../model/genre';
import { AppSettings } from '../../app.settings';

@Injectable({ providedIn: 'root' })
export class GenreService {
  public readonly GENRE_URL: string = AppSettings.REST_URL + '/v0/Movie/genres';

  constructor(private http: HttpClient) {}

  public getGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(this.GENRE_URL);
  }

  public createGenre(genre: IGenre): Observable<IGenre> {
    return this.http.post<IGenre>(this.GENRE_URL, genre);
  }

  public updateGenre(id: number, genre: IGenre): Observable<IGenre> {
    return this.http.put<IGenre>(this.GENRE_URL + '/' + id, genre);
  }

  public deleteGenre(id: number): Observable<{}> {
    return this.http.delete<any>(this.GENRE_URL + '/' + id);
  }

}
