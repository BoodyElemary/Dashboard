import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminProfileService {
  constructor(private http: HttpClient) {}
  profileAPI = 'http://localhost:8081/api/admins/profile';
  getUserProfile() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log(token);
    return this.http.get(`${this.profileAPI}/`, { headers });
  }
}
