import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieHandleService } from './cookie-handle.service';
import { environment } from '../../environments/environment.development';
import { ProductRequest, ProductsRequest } from '../interface/product.interface';
import { IS_PUBLIC } from '../token/http-context-token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private cookie = inject(CookieHandleService);
  private API_URL = `${environment.API}/product`;

  getProducts() {
    return this.http.get<ProductsRequest>(`${this.API_URL}/all`, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  accessProduct(id: number) {
    return this.http
      .post<any>(
        `${this.API_URL}/${id}`,
        {},
        { context: new HttpContext().set(IS_PUBLIC, false) }
      )
      .pipe(
        tap((res) => {
          if (res.token) {
            this.cookie.setToken(res.token);
          }
        })
      );
  }
  getProduct() {
    return this.http.get<ProductRequest>(`${this.API_URL}`, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  addProduct(name: string, description: string) {
    const payload = {
      name,
      description,
    };
    return this.http
      .post<any>(`${this.API_URL}`, payload, {
        context: new HttpContext().set(IS_PUBLIC, false),
      })
      .pipe(
        tap((res) => {
          if (res.token) {
            this.cookie.setToken(res.token);
          }
        })
      );
  }
}
