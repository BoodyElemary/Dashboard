import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToppingService {
  constructor(public loginService: LoginService, private http: HttpClient) {}

  private API_URL = 'http://localhost:8081/api/toppings';

  getAllToppings(): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get<any[]>(this.API_URL, { headers });
  }

  getToppingById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get<any>(`${this.API_URL}/${id}`, { headers });
  }

  addNewTopping(topping: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.post<any>(this.API_URL, topping, { headers });
  }

  updateTopping(topping: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put<any>(`${this.API_URL}/${topping._id}`, topping, {
      headers,
    });
  }

  deleteTopping(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete<any>(`${this.API_URL}/${id}`, { headers });
  }

  deleteToppingPermanently(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete<any>(`${this.API_URL}/${id}/hard`, { headers });
  }
}
