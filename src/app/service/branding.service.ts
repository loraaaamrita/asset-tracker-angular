import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandingService {
  baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient
  ) { }

  getCompanyLogo() {    
    return this._http.get(this.baseUrl+'company/branding/');
  }
}
