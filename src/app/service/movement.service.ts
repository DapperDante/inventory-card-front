import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IS_PUBLIC } from '../token/http-context-token';
import { MovementRequest } from '../interface/movement.interface';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  private http = inject(HttpClient);
  private API_URL = `${environment.API}/movement`;
  getMovements(): Observable<MovementRequest> {
    return this.http.get<MovementRequest>(`${this.API_URL}/all`, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  initialBalance(quantity: number, unit_cost: number): Observable<void> {
    const payload = {
      quantity,
      unit_cost
    };
    return this.http.post<void>(`${this.API_URL}/initial_balance`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  purchase(quantity: number, unit_cost: number): Observable<void> {
    const payload = {
      quantity,
      unit_cost
    };
    return this.http.post<void>(`${this.API_URL}/purchase`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  sale(quantity: number): Observable<void> {
    const payload = {
      quantity
    };
    return this.http.post<void>(`${this.API_URL}/sale`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  productionRequired(quantity: number): Observable<void> {
    const payload = {
      quantity
    };
    return this.http.post<void>(`${this.API_URL}/production_required`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  purchaseReturn(quantity: number): Observable<void> {
    const payload = {
      quantity
    };
    return this.http.post<void>(`${this.API_URL}/purchase_return`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  saleReturn(quantity: number): Observable<void> {
    const payload = {
      quantity
    };
    return this.http.post<void>(`${this.API_URL}/sale_return`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  productionReturn(quantity: number): Observable<void> {
    const payload = {
      quantity
    };
    return this.http.post<void>(`${this.API_URL}/production_return`, payload, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
}
