import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardServiceService {
  apiUrl = `${environment.apiUrl}/orders`;
  constructor(
    private httpServ: HttpClient,
    private loginService: LoginService
  ) {}
  getSingleStoreInsights() {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.get(`${this.apiUrl}/store/insights`, {
      headers,
    });
  }
}
