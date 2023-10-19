import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getBreeds(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/breeds`);
  }

  getImageById(id: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/images/${id}`);
  }
}
