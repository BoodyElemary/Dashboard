import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiUrl = `${environment.apiUrl}/customers`;

  constructor(public loginService: LoginService, private http: HttpClient) {}

  createCustomer(data: any) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.post(this.apiUrl, data, { headers });
  }

  getAllCustomers() {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(this.apiUrl, { headers });
  }

  getCustomerById(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  updateCustomer(id: string, data: any) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers });
  }

  deleteCustomer(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  activateAccount(token: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}/activate/${token}`, { headers });
  }

  getCustomerProfile() {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  updateCustomerProfile(data: any) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put(`${this.apiUrl}/profile`, data, { headers });
  }
}
