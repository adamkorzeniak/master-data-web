import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AppSettings } from '../../app.settings';
import { ICryptoHolding } from '../model/crypto-holding';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private readonly CRYPTO_URL = AppSettings.REST_URL + '/v0/Crypto/holdings';
  private data: ICryptoHolding[] = [];

  constructor( private http: HttpClient ) {}

  public getCryptoHoldings(): Observable<ICryptoHolding[]> {
    return of(this.data);
  }
}
