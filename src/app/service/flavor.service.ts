import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FlavorService {
  constructor(public loginService: LoginService, private http: HttpClient) {}
  private apiUrl = 'http://localhost:8081/api/flavors';

  getFlavors(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getFlavor(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  createFlavor(flavorData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.post(`${this.apiUrl}`, flavorData, { headers });
  }

  updateFlavor(id: string, flavorData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put(`${this.apiUrl}/${id}`, flavorData, { headers });
  }

  softDeleteFlavor(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  hardDeleteFlavor(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.apiUrl}/${id}/hard`, { headers });
  }
}
