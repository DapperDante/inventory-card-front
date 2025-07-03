import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { CookieHandleService } from './cookie-handle.service';
import { IS_PUBLIC } from '../token/http-context-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookie = inject(CookieHandleService);
  private router = inject(Router);
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
          this.cookie.setToken(res.token);
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
          this.cookie.setToken(res.token);
        }
      })
    );
  }
  hasToken(): boolean {
    return this.cookie.isAuthenticated();
  }
  logout(): void {
    this.cookie.clearToken();
    this.router.navigate(['/login']);
  }
}
