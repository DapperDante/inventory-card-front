import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieHandleService } from './cookie-handle.service';
import { environment } from '../../environments/environment.development';
import { CardRequest, CardsRequest } from '../interface/card.interface';
import { IS_PUBLIC } from '../token/http-context-token';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private http = inject(HttpClient);
  private cookie = inject(CookieHandleService);
  private API_URL = `${environment.API}/card`;

  getCards() {
    return this.http.get<CardsRequest>(`${this.API_URL}/all`, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  accessCard(id: number) {
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
  getCard() {
    return this.http.get<CardRequest>(`${this.API_URL}`, {
      context: new HttpContext().set(IS_PUBLIC, false),
    });
  }
  addCard(
    method_id: number,
    currency_id: number,
    name: string,
    description: string,
    date: Date
  ) {
    const payload = {
      method_id,
      currency_id,
      name,
      description,
      date,
    };
    return this.http.post<any>(`${this.API_URL}`, payload, {
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
