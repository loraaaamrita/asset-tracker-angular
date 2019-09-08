import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  baseUrl   = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');
  email     = sessionStorage.getItem('userEmail');
 
  constructor(
    private _http: HttpClient
  ) { }

  getUserEmail() {
    return this._http.get(this.baseUrl+'user/email/', {params: {email: this.email}});
  }

  getUsers() {
    return this._http.get(this.baseUrl+'user/read/', {params: {tenant_id: this.tenant_id }});
  }

  createUser(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'user/create/', (obj));
  }

  updateUser(obj) {
    return this._http.put(this.baseUrl+'user/update/', (obj));
  }

  deleteUser(obj) {
    return this._http.put(this.baseUrl+'user/delete/', (obj));
  }

  updateProfile(obj) {
    return this._http.put(this.baseUrl+'user/profile/update', (obj));
  }

}