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
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const url = `${this.storesUrl}/${name}`;
    return this.http.get<any>(url, { headers });
  }

  createStore(
    store: any,
    heroImageFile: File | null,
    pageImageFile: File | null
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    formData.append('name', store.name);
    formData.append('map', store.map);
    formData.append('location', store.location);
    formData.append('phone', store.phone);
    formData.append('workingHours', store.workingHours);
    if (heroImageFile) formData.append('heroImage', heroImageFile);
    if (pageImageFile) formData.append('pageImage', pageImageFile);
    // formData.append('heroImage', store.heroImage);
    // formData.append('pageImage', store.pageImage);
    return this.http.post<any>(this.storesUrl, formData, { headers });
  }

  updateStore(
    store: any,
    heroImageFile?: File | null,
    pageImageFile?: File | null
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const formData = new FormData();
    if (store.name) formData.append('name', store.name);
    if (store.map) formData.append('map', store.map);
    if (store.location) formData.append('location', store.location);
    if (store.phone) formData.append('phone', store.phone);
    if (store.workingHours) formData.append('workingHours', store.workingHours);
    // if (store.heroImage) formData.append('heroImage', store.heroImage);
    // if (store.pageImage) formData.append('pageImage', store.pageImage);
    if (pageImageFile) formData.append('pageImage', pageImageFile);
    if (heroImageFile) formData.append('heroImage', heroImageFile);

    return this.http.put<any>(this.storesUrl, formData, { headers });
  }

  addStoreDay(id: string, day: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const url = `${this.storesUrl}/${id}/addDay`;
    return this.http.put<any>(url, { day }, { headers });
  }

  softDeleteStore(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const url = `${this.storesUrl}/${id}`;
    return this.http.delete<any>(url, { headers });
  }

  hardDeleteStore(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.loginService.getToken(),
    });
    const url = `${this.storesUrl}/${id}`;
    return this.http.delete<any>(url, { headers });
  }
}
