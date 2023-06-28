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
  store: string = localStorage.getItem('store') || '';
  info: any;

  async login(
    email: string,
    password: string,
    role: string,
    remember: boolean
  ): Promise<{ success: boolean; response: any }> {
    const url = 'http://localhost:8081/api/login/admin';
    const body = { fullName: email, password: password, role: role };

    try {
      const response = await lastValueFrom(
        this.http.post<{ message: string; admin: any }>(url, body)
      );

      const token = response.admin.token;
      const info = response.admin;

      this.role = role;
      this.token = token;
      this.info = info;

      if (role === 'admin') {
        this.store = response.admin.store.name;
      }

      if (remember) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('store', this.store);
      }

      return { success: true, response };
    } catch (error) {
      console.error(error);
      return { success: false, response: null };
    }
  }

  getToken() {
    return this.token;
  }

  getRole() {
    return this.role;
  }

  getStore() {
    return this.store;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.token = '';
    this.role = '';
  }

  isLogin() {
    return this.role === 'admin' || this.role === 'super';
  }
}
