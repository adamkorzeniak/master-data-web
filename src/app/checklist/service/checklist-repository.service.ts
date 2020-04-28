import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChecklistItem } from '../model/checklist-item';

@Injectable({ providedIn: 'root' })
export class CheclistService {

  constructor( private http: HttpClient ) {}

  public getChecklist(): Observable<IChecklistItem[]> {
    return this.http.get<IChecklistItem[]>("../../assets/data/checklist.json");
  }
}
