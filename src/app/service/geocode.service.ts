import { Injectable } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  private geocoder;
  constructor(
    private mapsAPILoader: MapsAPILoader) { 
    this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();  
    });
  }

  getAddress(address) {
    return new Observable(observer => {
      this.geocoder.geocode({'address': address}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next({
            lat: results[0].geometry.location.lat(), 
            lng: results[0].geometry.location.lng()
          });
        } 
        else
          observer.next({ lat: 0, lng: 0 });
        observer.complete();
      });
    });        
  }
}
