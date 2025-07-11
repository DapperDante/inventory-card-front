import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IS_PUBLIC } from '../token/http-context-token';
import { ConceptsRequest, CurrenciesRequest, MethodsRequest } from '../interface/resource.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private http = inject(HttpClient);
  private API_URL = `${environment.API}/resource`;
  getMethods(): Observable<MethodsRequest>{
    return this.http.get<MethodsRequest>(`${this.API_URL}/method`, {context: new HttpContext().set(IS_PUBLIC, false)});
  }
  getCurrencies(): Observable<CurrenciesRequest>{
    return this.http.get<CurrenciesRequest>(`${this.API_URL}/currency`, {context: new HttpContext().set(IS_PUBLIC, false)});
  }
  getConcepts(): Observable<ConceptsRequest>{
    return this.http.get<ConceptsRequest>(`${this.API_URL}/concept`, {context: new HttpContext().set(IS_PUBLIC, false)});
  }
}
