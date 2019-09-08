import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');
 
  constructor(
    private _http: HttpClient
  ) { }

  saveProfileImage(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'media/profile/', (obj));
  }

  saveCompanyImage(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'media/company/', (obj));
  }

  getMedia() {
    return this._http.get(this.baseUrl+'media/read/',
           {params: {tenant_id: this.tenant_id }});
  }

  createMedia(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'media/create/', (obj));
  }

  updateMedia(obj) {
    return this._http.put(this.baseUrl+'media/update/', (obj));
  }

  deleteMedia(obj) {
    return this._http.put(this.baseUrl+'media/delete/', (obj));
  }

}