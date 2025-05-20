import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, forkJoin, map, Observable, retry, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Product} from '../model/product.model';
import {Bundle} from '../model/bundle.model';

@Injectable({
  providedIn: 'root'
})
/**
 * @summary Servicio que gestiona la obtención de bundles y productos desde la API simulada,
 * incluyendo el cálculo del ahorro ("youSave") por cada bundle.
 * @author Jack Arana
 */
export class BundlesService {

  /**
   * URL base para obtener los bundles desde la API.
   */
  fakeApiBundleUrl: string = environment.apiUrl + '/bundles';

  /**
   * URL base para obtener los productos desde la API.
   */
  fakeApiProductUrl: string = environment.apiUrl + '/products';

  /**
   * Constructor que inyecta el cliente HTTP para realizar peticiones a la API.
   * @param http Cliente HTTP de Angular.
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * Maneja y registra errores ocurridos durante una petición HTTP.
   * @param error Error recibido de la respuesta HTTP.
   * @returns Observable con el error procesado.
   */
  checkError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`ERROR OCCURRED ${error.status}, BODY WAS: ${error.error}`);
    } else {
      console.log(`BACKEND RETURNED CODE ${error.status}, BODY WAS: ${error.error}`);
    }
    return throwError('SOMETHING HAPPENED WITH REQUEST, TRY AGAIN.');
  }

  /**
   * Obtiene todos los productos desde la API.
   * @returns Observable de un arreglo de productos.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.fakeApiProductUrl)
      .pipe(retry(1), catchError(this.checkError));
  }

  /**
   * Obtiene todos los bundles desde la API.
   * @returns Observable de un arreglo de bundles.
   */
  getBundles(): Observable<Bundle[]> {
    return this.http.get<Bundle[]>(this.fakeApiBundleUrl)
      .pipe(retry(1), catchError(this.checkError));
  }

  /**
   * Obtiene los productos asociados a un bundle específico por su ID.
   * @param bundleId ID del bundle.
   * @returns Observable de un arreglo de productos filtrados por bundle.
   */
  getProductsByBundleId(bundleId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.fakeApiProductUrl}?bundleId=${bundleId}`)
      .pipe(retry(1), catchError(this.checkError));
  }

  /**
   * Obtiene los bundles con el cálculo adicional de cuánto se ahorra el usuario en cada uno.
   * @returns Observable de un arreglo de bundles con la propiedad `youSave` incluida.
   */
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

