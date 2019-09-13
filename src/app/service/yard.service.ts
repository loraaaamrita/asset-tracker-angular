import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { IYard } from '../model/yard';

@Injectable({
  providedIn: 'root'
})
export class YardService {

  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');
 
  constructor(
    private _http: HttpClient
  ) { }

  getYard() {
    return this._http.get(this.baseUrl+'yard/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  createYard(yard: IYard) {
    yard.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'yard/create/', (yard));
  }

  updateYard(yard: IYard) {
    return this._http.put(this.baseUrl+'yard/update/', (yard));
  }

}
