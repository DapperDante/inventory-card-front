import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IS_PUBLIC } from '../token/http-context-token';
import { conceptsRequest, currenciesRequest, methodsRequest } from '../interface/resource.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private http = inject(HttpClient);
  private API_URL = `${environment.API}/resource`;
  getMethods(): Observable<methodsRequest>{
    return this.http.get<methodsRequest>(`${this.API_URL}/method`, {context: new HttpContext().set(IS_PUBLIC, false)});
  }
  getCurrencies(): Observable<currenciesRequest>{
    return this.http.get<currenciesRequest>(`${this.API_URL}/currency`, {context: new HttpContext().set(IS_PUBLIC, false)});
  }
  getConcepts(): Observable<conceptsRequest>{
    return this.http.get<conceptsRequest>(`${this.API_URL}/concept`, {context: new HttpContext().set(IS_PUBLIC, false)});
  }
}
