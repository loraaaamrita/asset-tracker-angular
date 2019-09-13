import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { IMedia, IDeleteMedia } from "../model/media";


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

  createMedia(media: IMedia) {
    media.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'media/create/', (media));
  }

  updateMedia(media: IMedia) {
    return this._http.put(this.baseUrl+'media/update/', (media));
  }

  deleteMedia(media: IDeleteMedia) {
    return this._http.put(this.baseUrl+'media/delete/', (media));
  }

}