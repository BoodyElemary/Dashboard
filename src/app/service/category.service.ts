import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8081/api/categories';

  constructor(private http: HttpClient, public loginService: LoginService) {}

  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(this.baseUrl, { headers });
  }

  getCategoryById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  createCategory(category: any, picture: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('picture', picture, picture.name);
    return this.http.post(this.baseUrl, formData, { headers });
  }

  updateCategory(
    id: string,
    category?: any,
    picture?: File | null
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    if (category) {
      if (category.name) formData.append('name', category.name);
      if (category.description)
        formData.append('description', category.description);
    }
    if (picture) {
      formData.append('picture', picture, picture.name);
    }
    return this.http.put(`${this.baseUrl}/${id}`, formData, { headers });
  }

  getCategoryProducts(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.baseUrl}/${id}/products`, {
      headers,
    });
  }

  softDeleteCategory(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  hardDeleteCategory(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.baseUrl}/${id}/hard`, { headers });
  }
}
