import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  productsAPI: String = `${environment.apiUrl}`;

  constructor(
    private httpServ: HttpClient,
    private loginService: LoginService
  ) {}
  getAdminOrders(skip: number = 0) {
    const token = this.loginService.getToken();
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.get(
      `${this.productsAPI}/orders/sotresOrders?skip=${skip}&limit=10`,
      {
        headers,
      }
    );
  }

  editOrderStatus(id: string, data: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpServ.put(`${this.productsAPI}/orders/${id}/status`, data, {
      headers,
    });
  }
}
