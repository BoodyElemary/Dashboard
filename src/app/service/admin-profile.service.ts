import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProfileService {
  constructor(private http: HttpClient, private loginService: LoginService) {}
  profileAPI = 'http://localhost:8081/api/admins/profile';
  getUserProfile() {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    console.log(token);
    return this.http.get(`${this.profileAPI}/`, { headers });
  }
}
