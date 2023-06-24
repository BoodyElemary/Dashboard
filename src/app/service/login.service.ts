import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  token: string = localStorage.getItem('token') || '';
  role: string = localStorage.getItem('role') || '';
  async login(
    email: string,
    password: string,
    role: string,
    store: boolean
  ): Promise<boolean> {
    const url = 'http://localhost:8081/api/login/admin';
    const body = { fullName: email, password: password, role: role };
    try {
      const response = await lastValueFrom(
        this.http.post<{ message: string; admin: any }>(url, body)
      );
      const token = response.admin.token;
      this.role = role;
      this.token = token;
      if (store) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  getToken() {
    return this.token;
  }
  getRole() {
    return this.role;
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.token = '';
    this.role = '';
  }
  isLogin() {
    return this.role === 'admin' || this.role === 'super' ? true : false;
  }
}
