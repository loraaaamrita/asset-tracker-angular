import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

import * as _ from 'lodash'; 

import { YardService } from "../../service/yard.service";
import { AssetService } from "../../service/asset.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-asset-map',
  templateUrl: './asset-map.component.html',
  styleUrls: ['./asset-map.component.scss']
})
export class AssetMapComponent implements OnInit {
  
  security: any;
  assets: any;
  yard: any;
  yardId: number;
  yardName: string;
  categories: any;
  statuses: any;
  status_id: any;
  category_id: any;
  icon: string;
  isYard: boolean = false;
  isAssetVitals: boolean = false;
  allMarkers = [];
  filteredMarkers = [];

  infoWindowOpened: any;
  prevInfoWindow: any;

  selectedName: string;
  selectedUnitNo: string;
  selectedCategory: string;
  selectedStatus: string;
  
  zoom: number = 7;
  
  lat: number = 51.0486;
  lng: number = -114.0708;

  constructor(
    private yardService: YardService,
    private assetService: AssetService,
    private settingService: SettingService,
    private securityService: SecurityService) { }

  ngOnInit() {
    this.securityService.getAssetSecurity().subscribe(security => {
      this.security = security;
    });
    this.yardService.getYard().subscribe(yard => {
      this.yard = yard;
      this.assetService.getAssets().subscribe(assets => {
        this.assets = assets;
        console.log(this.assets)
        this.getMarkers()
      });
    });
    
    this.settingService.getCategories().subscribe(response => {
      this.categories = response;
    });
    this.settingService.getStatuses().subscribe(response => {
      this.statuses = response;
    });
  }

  getMarkers(){
    this.assets.forEach(element => {
      this.allMarkers = []
      console.log(element)
      // if (element.yard_id === null) {
        if (element.status === 'Maintenance')
          this.icon = 'assets/images/orange.png';
        if (element.status === 'Booked')
          this.icon = 'assets/images/blue.png';
        if (element.status === 'Available')
          this.icon = 'assets/images/green.png'
        this.allMarkers.push({
          lat: element.lat,
          lng: element.lng,
          label: element.unit_number,
          name: element.name,
          category: element.category,
          status: element.status,
          icon: this.icon,
          asset_id: element.id
        })
      // }
    });
    // this.allMarkers.push({
    //   asset_id: this.assets.id,
    //   id: this.yard.id,
    //   lat: this.yard.lat,
    //   lng: this.yard.lng,
    //   label: '',
    //   name: this.yard.name,
    //   icon: 'assets/images/red-flag.png'
    // })
    this.filteredMarkers = this.allMarkers;
  }

  closePrevInfo() {
    if (this.prevInfoWindow) this.prevInfoWindow.close();
    this.isAssetVitals = false;
    this.isYard = false;
  }

  mouseOverMarker(marker, infoWindow) {
    if (marker.label) {
      if (!this.prevInfoWindow)
        this.prevInfoWindow = infoWindow;
      else {
        this.infoWindowOpened = infoWindow;
        this.prevInfoWindow.close();
      }
      this.prevInfoWindow   = infoWindow;
      this.selectedName     = marker.name;
      this.selectedUnitNo   = marker.label;
      this.selectedStatus   = marker.status;
      this.selectedCategory = marker.category;
      infoWindow.open();
    }
  }

  mouseOutMarker(marker, infoWindow) {
    infoWindow.close();
  }

  clickedMarker(marker, infoWindow) {
    infoWindow.content.textContent = "Company Yard"
    if (marker.label) {
      this.isAssetVitals = true;
      this.assetService.asset_id = marker.asset_id;
    } 
    else {
      this.yardId = marker.id;
      this.yardName = marker.name;
      this.isYard = true;
    }
  }

  filterCategory($event) {
    this.assetService.getAssetByCategoryId($event.value).subscribe(response => {
      this.assets = response;
      console.log(this.assets)
      this.getMarkers();
    });
    this.isAssetVitals = false;
  }

  filterStatus($event) {
    this.assetService.getAssetByStatusId($event.value).subscribe(response => {
      this.assets = response;
      console.log(this.assets)
      this.getMarkers();
    });
    this.isAssetVitals = false;
  }

  // applyFilter(filterValue: string) {
  //   console.log(filterValue)
  //   if (filterValue) {
  //     let value = filterValue.trim().toLowerCase();
  //     this.filteredMarkers = _.filter(this.allMarkers, o => _.includes(_.values(o), value));  
  //   }
  //   else this.filteredMarkers = this.allMarkers;
  // }

  cancelVitals() {
    this.isAssetVitals = false;
  }

  cancelYard() {
    this.isYard = false;
  }

}

