import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { IAsset, ICategories, IStatuses, IDeleteAsset, IAddToMap, IDeleteFromMap } from "../model/asset";

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');

  constructor(
    private _http: HttpClient
  ) { }

  public asset_id: any;

  getAssets() {
    return this._http.get(this.baseUrl+'asset/read/', 
           {params: {tenant_id: this.tenant_id}});
  }

  getAsset(id) {
    return this._http.get(this.baseUrl+'asset/', 
      {params: {id: id}});
  }

  getAssetVitals(id) {
    return this._http.get(this.baseUrl+'asset/vitals', 
      {params: {id: id}});
  }

  getAssetByStatusId(id){
    return this._http.get(this.baseUrl+'asset/status', 
    {params: {id: id}});
  }

  getAssetByCategoryId(id){
    return this._http.get(this.baseUrl+'asset/category', 
    {params: {id: id}});
  }

  getYardAssets(yard_id) {
    return this._http.get(this.baseUrl+'asset/yard/read/', 
           {params: {tenant_id: this.tenant_id, yard_id: yard_id}});
  }

  updateAsset(asset: IAsset) {
    return this._http.put(this.baseUrl+'asset/update/', (asset));
  }

  createAsset(asset: IAsset) {
    asset.tenant_id = this.tenant_id;
    return this._http.post(this.baseUrl+'asset/create/', (asset))
  }

  deleteAsset(asset: IDeleteAsset) {
    return this._http.put(this.baseUrl+'asset/delete/', (asset))
  }

  getAssetHistory(id) {
    return this._http.get(this.baseUrl+'asset/history/read/id/', 
      {params: {id: id}});
  }

  getHistory(page_size, page_index) {
    return this._http.get(this.baseUrl+'asset/history/read/', {params: { 
        page_size:  page_size,
        page_index: page_index
      }
    });
  }

  addToMap(obj: IAddToMap) {
    return this._http.put(this.baseUrl+'asset/map/add', (obj));
  }

  deleteFromMap(obj: IDeleteFromMap) {
    return this._http.put(this.baseUrl+'asset/map/delete', (obj));
  }

}
