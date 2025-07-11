import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieHandleService {
  private cookie = inject(CookieService);
  private tokenSignal = signal<string | null>(this.cookie.get('token'));
  // Return the current token from the signal
  token = computed(() => this.tokenSignal());
  // Return a boolean indicating if the user is authenticated based on the presence of a token
  isAuthenticated = computed(() => !!this.token());
  constructor() {
    effect(() => {
      const token = this.tokenSignal();
      if (token) {
        this.removeToken();
        this.addToken();
      } else {
        this.removeToken();
      }
    });
  }
  private addToken(){
    this.cookie.set('token', this.token()!, {
      expires: 1,
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });
  }
  private removeToken(){
    this.cookie.delete('token', '/');
  }
  setToken(token: string): void {
    this.tokenSignal.set(token);
  }
  clearToken(): void {
    this.tokenSignal.set(null);
  }
}
