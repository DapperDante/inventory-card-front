import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieHandleService } from '../service/cookie-handle.service';
import { IS_PUBLIC } from '../token/http-context-token';

export const backendInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.context.get(IS_PUBLIC)){
    return next(req);
  }
  const token = inject(CookieHandleService).token();
  const newReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(newReq);
};
