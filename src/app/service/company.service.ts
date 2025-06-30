import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';
import { CookieHandleService } from './cookie-handle.service';
import { IS_PUBLIC } from '../token/http-context-token';
import { CompaniesRequest, CompanyRequest } from '../interface/company.interface';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private http = inject(HttpClient);
  private cookie = inject(CookieHandleService);
  private API_URL = `${environment.API}/company`;

  getCompanies(){
    return this.http.get<CompaniesRequest>(`${this.API_URL}/all`, { context: new HttpContext().set(IS_PUBLIC, false) });
  }
  accessCompany(id: number){
    return this.http.post<any>(`${this.API_URL}/${id}`, {}, { context: new HttpContext().set(IS_PUBLIC, false) })
    .pipe(
      tap((res) => {
        if(res.token){
          this.cookie.addToken(res.token);
        }
      })
    );
  }
  getCompany(){
    return this.http.get<CompanyRequest>(`${this.API_URL}`, { context: new HttpContext().set(IS_PUBLIC, false) });
  }
  addCompany(name: string){
    const payload = {
      name
    }
    return this.http.post<any>(`${this.API_URL}`, payload, { context: new HttpContext().set(IS_PUBLIC, false) })
    .pipe(
      tap((res) => {
        if(res.token){
          this.cookie.addToken(res.token);
        }
      })
    )
  }
}
