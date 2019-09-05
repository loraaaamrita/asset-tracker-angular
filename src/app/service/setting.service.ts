import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  
  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');
 
  constructor(
    private _http: HttpClient
  ) { }

  getRoles() {
    return this._http.get(this.baseUrl+'role/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createRole(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'role/create/', (obj));
  }

  updateRole(obj) {
    return this._http.put(this.baseUrl+'role/update/', (obj));
  }

  deleteRole(obj) {
    return this._http.put(this.baseUrl+'role/delete/', (obj))
  }

  getCategories() {
    return this._http.get(this.baseUrl+'category/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createCategory(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'category/create/', (obj));
  }

  updateCategory(obj) {
    return this._http.put(this.baseUrl+'category/update/', (obj));
  }

  deleteCategory(obj) {
    return this._http.put(this.baseUrl+'category/delete/', (obj));
  }

  getStatuses() {
    return this._http.get(this.baseUrl+'status/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createStatus(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'status/create/', (obj));
  }

  updateStatus(obj) {
    return this._http.put(this.baseUrl+'status/update/', (obj));
  }

  deleteStatus(obj) {
    return this._http.put(this.baseUrl+'status/delete/', (obj));
 }

  getCompany() {
    return this._http.get(this.baseUrl+'company/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createCompany(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'company/create/', (obj));
  }

  updateCompany(obj) {
    return this._http.put(this.baseUrl+'company/update/', (obj));
  }

  getPermissions(role_id) {
    return this._http.get(this.baseUrl+'permission/read/', 
           {params: {tenant_id: this.tenant_id, role_id: role_id}});
  }

  createPermissions(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'permission/create/', (obj));
  }

  updatePermissions(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.put(this.baseUrl+'permission/update/', (obj));
  }

}
