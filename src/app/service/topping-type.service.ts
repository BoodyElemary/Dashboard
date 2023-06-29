import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToppingTypeService {
  constructor(public loginService: LoginService, private http: HttpClient) {}
  private apiUrl = 'http://localhost:8081/api/toppingsType';

  getToppingTypes(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getToppingType(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  createToppingType(toppingTypeData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.post(`${this.apiUrl}`, toppingTypeData, { headers });
  }

  updateToppingType(id: string, toppingTypeData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put(`${this.apiUrl}/${id}`, toppingTypeData, { headers });
  }

  softDeleteToppingType(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  hardDeleteToppingType(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.apiUrl}/${id}/hard`, { headers });
  }

  getToppingTypeItems(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}/${id}/items`, { headers });
  }
}
