import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  get$(path: string) {
    return this.http.get(path);
  }
  post$(path: string, body: any) {
    return this.http.post(path, body);
  }
  patch$(path: string, body: any) {
    return this.http.patch(path, body);
  }
  delete$(path: string) {
    return this.http.delete(path);
  }
}
