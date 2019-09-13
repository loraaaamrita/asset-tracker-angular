import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IUsers, IDeleteUser } from '../model/user';

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

  createUser(user: IUsers) {
    user.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'user/create/', (user));
  }

  updateUser(user: IUsers) {
    return this._http.put(this.baseUrl+'user/update/', (user));
  }

  deleteUser(user: IDeleteUser) {
    return this._http.put(this.baseUrl+'user/delete/', (user));
  }

  updateProfile(obj) {
    return this._http.put(this.baseUrl+'user/profile/update', (obj));
  }

}