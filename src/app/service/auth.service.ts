import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { CookieHandleService } from './cookie-handle.service';
import { IS_PUBLIC } from '../token/http-context-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookie = inject(CookieHandleService);
  private readonly API_URL = `${environment.API}/user`;

  login(username: string, password: string): Observable<any> {
    const payload = {
      username,
      password
    };
    return this.http.post(`${this.API_URL}/login`, payload, { context: new HttpContext().set(IS_PUBLIC, true) })
    .pipe(
      tap((res: any) => {
        if(res.token){
          this.cookie.addToken(res.token);
        }
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    const payload = {
      username,
      email,
      password
    };
    return this.http.post(`${this.API_URL}/signup`, payload, { context: new HttpContext().set(IS_PUBLIC, true) })
    .pipe(
      tap((res: any) => {
        if(res.token){
          this.cookie.addToken(res.token);
        }
      })
    );
  }
  hasToken(): boolean {
    return this.cookie.hasToken();
  }
  logout(): void {
    this.cookie.deleteToken();
  }
}
