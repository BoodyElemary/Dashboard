import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8081/api/admins';

  constructor(private http: HttpClient, private loginService: LoginService) {}

  getAllAdmins(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }
  addNewAdmin(adminData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.post<any>(`${this.apiUrl}`, adminData, { headers });
  }
  getAdminById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get<any>(`${this.apiUrl}/id/${id}`, { headers });
  }
  updateAdmin(adminData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put<any>(this.apiUrl, adminData, {
      headers,
    });
  }
  deleteAdmin(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete<any>(`${this.apiUrl}/id/${id}`, { headers });
  }
  searchAdmins(query: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get<any>(`${this.apiUrl}/search/${query}`, { headers });
  }
}
