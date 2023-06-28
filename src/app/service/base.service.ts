import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    public loginService: LoginService,
    private httpClient: HttpClient
  ) {}
  apiUrl = 'http://localhost:8081/api/bases';
  getAllBases() {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.httpClient.get(this.apiUrl, { headers });
  }
  getBaseById(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.httpClient.get(`${this.apiUrl}/${id}`, { headers });
  }
  createBase(base: any, picture: File) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    formData.append('name', base.name);
    formData.append('price', base.price);
    formData.append('picture', picture, picture.name);

    return this.httpClient.post(this.apiUrl, formData, { headers });
  }

  updateBase(id: string, base: any, picture: File|null) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    if(base.name)formData.append('name', base.name);
    if(base.price)formData.append('price', base.price);
    if(picture)formData.append('picture', picture, picture.name);
    return this.httpClient.put(`${this.apiUrl}/${id}`, formData, { headers });
  }
  deleteBase(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers });
  }
  softDeleteBase(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.httpClient.delete(`${this.apiUrl}/${id}`, { headers });
  }
  hardDeleteBase(id: string) {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.httpClient.delete(`${this.apiUrl}/${id}/hard`, { headers });
  }
}
