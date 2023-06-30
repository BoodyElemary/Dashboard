import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient, public loginService: LoginService) {}

  getAllProducts(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(this.baseUrl, { headers });
  }

  getProductById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  createProduct(product: any, picture: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    console.log(product);
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('size', product.size);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('details.brief', product.details.brief);
    formData.append('details.nutrition', product.details.nutrition);
    formData.append('details.ingredients', product.details.ingredients);
    formData.append('picture', picture, picture.name);
    return this.http.post(this.baseUrl, formData, { headers });
  }

  updateProduct(
    id: string,
    product?: any,
    picture?: File | null
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    if (product.name) formData.append('name', product.name);
    if (product.size) formData.append('size', product.size);
    if (product.price) formData.append('price', product.price);
    if (product.details.brief)
      formData.append('details.brief', product.details.brief);
    if (product.details.nutrition)
      formData.append('details.nutrition', product.details.nutrition);
    if (product.details.ingredients)
      formData.append('details.ingredients', product.details.ingredients);
    if (picture) {
      formData.append('picture', picture, picture.name);
    }
    return this.http.put(`${this.baseUrl}/${id}`, formData, { headers });
  }

  softDeleteProduct(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }

  hardDeleteProduct(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.delete(`${this.baseUrl}/${id}/hard`, { headers });
  }
}
