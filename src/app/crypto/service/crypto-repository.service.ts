import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AppSettings } from '../../app.settings';
import { ICryptoHolding } from '../model/crypto-holding';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  private readonly CRYPTO_URL = AppSettings.HOST + '/Crypto/v0/holdings';

  constructor( private http: HttpClient ) {}

  public getCryptoHoldings(): Observable<ICryptoHolding[]> {
    return of(this.data);
  }

  private data: ICryptoHolding[] = [
    {
      "id": 1,
      "symbol": "BTC",
      "name": "Bitcoin",
      "amount": 0.24,
      "price": 500.1,
      "value": 192.2
    },
    {
      "id": 5,
      "symbol": "LTC",
      "name": "Litecoin",
      "amount": 11.24,
      "price": 50.1,
      "value": 222.2
    },
    {
      "id":7,
      "symbol": "ETH",
      "name": "Ethereum",
      "amount": 1.24,
      "price": 120.1,
      "value": 223.2
    },
    {
      "id": 12,
      "symbol": "SNC",
      "name": "Sun Contract",
      "amount": 1000.24,
      "price": 0.1,
      "value": 12.2
    }
  ]
}
