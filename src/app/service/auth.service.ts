import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private readonly API_URL = `${environment.apiUrl}/user`;

  login(username: string, password: string): Observable<any> {
    const payload = {
      username,
      password
    };
    return this.http.post(`${this.API_URL}/login`, payload)
    .pipe(
      tap((res: any) => {
        if(res.token){
          this.cookie.set('token', res.token , {
            expires: 1,
            secure: true,
            sameSite: 'Strict'
          })
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
    return this.http.post(`${this.API_URL}/signup`, payload)
    .pipe(
      tap((res: any) => {
        if(res.token){
          this.cookie.set('token', res.token , {
            expires: 1,
            secure: true,
            sameSite: 'Strict'
          })
        }
      })
    );
  }
  hasToken(): boolean {
    return this.cookie.check('token');
  }
}
