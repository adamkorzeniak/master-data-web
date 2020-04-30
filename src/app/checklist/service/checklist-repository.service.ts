import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IChecklistGroup } from '../model/checklist-item';

@Injectable({ providedIn: 'root' })
export class CheclistService {

  constructor( private http: HttpClient ) {}

  public getChecklist(): Observable<IChecklistGroup[]> {
    return this.http.get<IChecklistGroup[]>("../../assets/data/checklist.json");
  }
}
