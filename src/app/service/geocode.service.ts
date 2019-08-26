import { Injectable } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { Observable } from 'rxjs';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {

  geocoder = new google.maps.Geocoder();

  constructor() { }

  getAddress(location) {
    return new Observable(observer => {
      this.geocoder.geocode({'address': location}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log('Geocoding complete!');
          observer.next({
            lat: results[0].geometry.location.lat(), 
            lng: results[0].geometry.location.lng()
          });
          } 
          else {
            console.log('Error - ', results, ' & Status - ', status);
            observer.next({ lat: 0, lng: 0 });
          }
        observer.complete();
      });
    });        
  }
}
