import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient
  ) { }

  login(obj) {
     return this._http.post(this.baseUrl+'login/', (obj));
  }

  register(obj) {
    return this._http.post(this.baseUrl+'register/', (obj));
  }

  verify(obj) {
    return this._http.post(this.baseUrl+'verify/', (obj));
  }

  auth() {
    return this._http.get(this.baseUrl+'auth/');
  }

}
