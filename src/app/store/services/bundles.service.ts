import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, forkJoin, map, Observable, retry, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Product} from '../model/product.model';
import {Bundle} from '../model/bundle.model';

@Injectable({
  providedIn: 'root'
})
export class BundlesService {

  fakeApiBundleUrl: string = environment.apiUrl + '/bundles';
  fakeApiProductUrl: string = environment.apiUrl + '/products';

  constructor(private readonly http: HttpClient) { }

  checkError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`ERROR OCURRED ${error.status}, BODY WAS: ${error.error}`);
    }
    else { console.log(`BACKEND RETURNED COD ${error.status}, BODY WAS: ${error.error}`); }
    return throwError (
      'SOMETHING HAPPEND WITH REQUEST, TRY AGAIN.'
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.fakeApiProductUrl)
      .pipe(retry(1), catchError(this.checkError));
  }

  getBundles(): Observable<Bundle[]> {
    return this.http.get<Bundle[]>(this.fakeApiBundleUrl)
      .pipe(retry(1), catchError(this.checkError));
  }

  getProductsByBundleId(bundleId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.fakeApiProductUrl}?bundleId=${bundleId}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  getBundlesWithSavings(): Observable<Bundle[]> {
    return forkJoin({
      bundles: this.getBundles(),
      products: this.getProducts()
    }).pipe(
      map(({ bundles, products }) => {
        return bundles.map(bundle => {
          const bundleProducts = products.filter(p => p.bundleId === bundle.id);
          const totalProductsPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
          return {
            ...bundle,
            youSave: totalProductsPrice - bundle.price
          };
        });
      })
    );
  }

}
