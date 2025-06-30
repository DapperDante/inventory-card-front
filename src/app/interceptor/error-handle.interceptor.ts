import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { IS_PUBLIC } from '../token/http-context-token';

export const errorHandleInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error) => {
      if(req.context.get(IS_PUBLIC)) {
        return throwError(() => error);
      }
      if(error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    })
  )
}
