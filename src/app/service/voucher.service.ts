import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  apiUrl = 'http://localhost:8081/api/vouchers';

  constructor(private http: HttpClient, public loginService: LoginService) {}

  getVouchers() {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(this.apiUrl, { headers });
  }

  createVoucher(voucherData: any) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.post(this.apiUrl, voucherData, { headers });
  }

  updateVoucher(voucherId: string, voucherData: any) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.put(`${this.apiUrl}/${voucherId}`, voucherData, {
      headers,
    });
  }

  deleteVoucher(voucherId: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.apiUrl}/${voucherId}`, { headers });
  }
}
