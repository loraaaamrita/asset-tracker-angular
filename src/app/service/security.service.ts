import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');

  role_id = sessionStorage.getItem('roleId');

  constructor(
    private _http: HttpClient
  ) { }

  getNavigationSecurity(role_id) {
    return this._http.get(this.baseUrl+'security/navigation/', 
      {params: {tenant_id: this.tenant_id, role_id: role_id }});
  }

  getAssetMapSecurity() {
    return this._http.get(this.baseUrl+'security/asset/map', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getAssetSecurity() {
    return this._http.get(this.baseUrl+'security/asset/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getCompanySecurity() {
    return this._http.get(this.baseUrl+'security/company/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getSettingsSecurity() {
    return this._http.get(this.baseUrl+'security/settings/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getMediaSecurity() {
    return this._http.get(this.baseUrl+'security/media/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getCategorySecurity() {
    return this._http.get(this.baseUrl+'security/category/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getRoleSecurity() {
    return this._http.get(this.baseUrl+'security/role/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getPermissionSecurity() {
    return this._http.get(this.baseUrl+'security/permission/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getStatusSecurity() {
    return this._http.get(this.baseUrl+'security/status/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

  getUserSecurity() {
    return this._http.get(this.baseUrl+'security/user/', 
    {params: {tenant_id: this.tenant_id, role_id: this.role_id }});
  }

}
