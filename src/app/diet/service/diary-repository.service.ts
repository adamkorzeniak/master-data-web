import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppSettings } from '../../app.settings';
import { IDiaryItem } from '../model/IDiaryItem';

@Injectable({ providedIn: 'root' })
export class DiaryService {
  public readonly DIARY_URL: string = AppSettings.REST_URL + '/v0/Diet/diaryItems';

  constructor(private http: HttpClient) {}

  public getDiaryItems(): Observable<IDiaryItem[]> {
      return of(this.diaryItems).pipe(
        delay(2000)
      );
    // return this.http.get<IDiaryItem[]>(this.DIARY_URL);
  }

  public createDiaryItem(genre: IDiaryItem): Observable<IDiaryItem> {
    return this.http.post<IDiaryItem>(this.DIARY_URL, genre);
  }

  public updateDiaryItem(id: number, genre: IDiaryItem): Observable<IDiaryItem> {
    return this.http.put<IDiaryItem>(this.DIARY_URL + '/' + id, genre);
  }

  public deleteDiaryItem(id: number): Observable<{}> {
    return this.http.delete<any>(this.DIARY_URL + '/' + id);
  }


  private diaryItems: IDiaryItem[] = [
    {
      id: 15,
      productId: 20,
      productName: "kiełbasa",
      unitName: "kawałek",
      amount: 2,
      calories: 800,
      carbs: 10,
      proteins: 40,
      fats: 40
    },
    {
      id: 18,
      productId: 26,
      productName: "chleb",
      unitName: "kromka",
      amount: 2,
      calories: 150,
      carbs: 40,
      proteins: 5,
      fats: 5
    }
  ]
}
