import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { IRoles, ICompany, IPermissions, IDeleteRole } from "../model/setting";
import { ICategories, IStatuses, IDeleteCategory, IDeleteStatus } from '../model/asset';



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

  createRole(role: IRoles) {
    role.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'role/create/', (role));
  }

  updateRole(role: IRoles) {
    return this._http.put(this.baseUrl+'role/update/', (role));
  }

  deleteRole(role: IDeleteRole) {
    return this._http.put(this.baseUrl+'role/delete/', (role))
  }

  getCategories() {
    return this._http.get(this.baseUrl+'category/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createCategory(category: ICategories) {
    category.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'category/create/', (category));
  }

  updateCategory(category: ICategories) {
    return this._http.put(this.baseUrl+'category/update/', (category));
  }

  deleteCategory(category: IDeleteCategory) {
    return this._http.put(this.baseUrl+'category/delete/', (category));
  }

  getStatuses() {
    return this._http.get(this.baseUrl+'status/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createStatus(status: IStatuses) {
    status.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'status/create/', (status));
  }

  updateStatus(status: IStatuses) {
    return this._http.put(this.baseUrl+'status/update/', (status));
  }

  deleteStatus(status: IDeleteStatus) {
    return this._http.put(this.baseUrl+'status/delete/', (status));
 }

  getCompany() {
    return this._http.get(this.baseUrl+'company/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createCompany(company: ICompany) {
    company.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'company/create/', (company));
  }

  updateCompany(company: ICompany) {
    return this._http.put(this.baseUrl+'company/update/', (company));
  }

  getPermissions(role_id) {
    return this._http.get(this.baseUrl+'permission/read/', 
           {params: {tenant_id: this.tenant_id, role_id: role_id}});
  }

  createPermissions(permission: IPermissions) {
    permission.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'permission/create/', (permission));
  }

  updatePermissions(permission: IPermissions) {
    permission.tenant_id = this.tenant_id;
    return this._http.put(this.baseUrl+'permission/update/', (permission));
  }

}
