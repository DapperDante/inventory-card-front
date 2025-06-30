import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieHandleService {
  private cookie = inject(CookieService);
  addToken(token: string): void{
    if(this.hasToken()){
      this.deleteToken();
    }
    this.cookie.set('token', token, {
      expires: 1,
      secure: true,
      sameSite: 'Strict'
    });
  }
  deleteToken(): void {
    this.cookie.delete('token');
  }
  getToken(): string {
    return this.cookie.get('token');
  }
  hasToken(): boolean {
    return this.cookie.check('token');
  }
}
