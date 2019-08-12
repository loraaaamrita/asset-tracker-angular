import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YardService {

  baseUrl = environment.baseUrl;
  tenant_id = localStorage.getItem('tenantId');
 
  constructor(
    private _http: HttpClient
  ) { }

  getYard() {
    return this._http.get(this.baseUrl+'yard/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createYard(obj) {
    obj.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'yard/create/', (obj));
  }

  updateYard(obj) {
    return this._http.put(this.baseUrl+'yard/update/', (obj));
  }

}
