import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storesUrl = 'http://localhost:8081/api/stores';

  constructor(private http: HttpClient, public loginService: LoginService) {}

  getStores(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    return this.http.get<any>(this.storesUrl, { headers });
  }

  getStore(name: string): Observable<any> {
    const url = `${this.storesUrl}/${name}`;
    return this.http.get<any>(url);
  }

  createStore(
    store: any,
    heroImageFile: File,
    pageImageFile: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('name', store.name);
    formData.append('description', store.description);
    formData.append('heroImage', heroImageFile);
    formData.append('pageImage', pageImageFile);
    return this.http.post<any>(this.storesUrl, formData);
  }

  updateStore(id: string, store: any, pictureFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', store.name);
    formData.append('description', store.description);
    formData.append('picture', pictureFile);
    const url = `${this.storesUrl}/${id}`;
    return this.http.put<any>(url, formData);
  }

  addStoreDay(id: string, day: string): Observable<any> {
    const url = `${this.storesUrl}/${id}/addDay`;
    return this.http.put<any>(url, { day });
  }

  softDeleteStore(id: string): Observable<any> {
    const url = `${this.storesUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  hardDeleteStore(id: string): Observable<any> {
    const url = `${this.storesUrl}/${id}`;
    return this.http.delete<any>(url);
  }
}
