import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppSettings } from '../../app.settings';
import { IDiaryItem } from '../model/IDiaryItem';
import { IProduct } from '../model/IProduct';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public readonly PRODUCT_URL: string = AppSettings.REST_URL + '/v0/Diet/products';

  constructor(private http: HttpClient) {}

  public queryProducts(name: string): Observable<IProduct[]> {
    if (name !== null) {
      return this.http.get<IProduct[]>(this.PRODUCT_URL + '?search-name=' + name);
    }
    return this.http.get<IProduct[]>(this.PRODUCT_URL);
  }

  public createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.PRODUCT_URL, product);
  }

  public updateProduct(id: number, product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.PRODUCT_URL + '/' + id, product);
  }

  public deleteProduct(id: number): Observable<{}> {
    return this.http.delete<any>(this.PRODUCT_URL + '/' + id);
  }
}
