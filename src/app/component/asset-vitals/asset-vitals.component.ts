import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-asset-vitals',
  templateUrl: './asset-vitals.component.html',
  styleUrls: ['./asset-vitals.component.scss']
})
export class AssetVitalsComponent implements OnInit, OnChanges {

  @Input()  assetId: number;
  @Output() cancelVitals = new EventEmitter();

  history: any;
  security: any;
  statuses: any;
  categories: any;
  asset_id: any;
  asset_vitals: any;

  assetForm: FormGroup;

  lat: number = 52.64836;
  lng: number = -114.246338;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private assetService: AssetService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.assetForm = this.fb.group({
      name:         [null, Validators.required],
      unit_number:  [null, Validators.required],
      category:     [null],
      status:       [null]
    })
  }

  ngOnChanges() {
    console.log(this.assetId)
    this.assetService.getAssetVitals(this.assetId).subscribe(response => {
      this.asset_vitals = response;
    });
  }

  ngOnInit() {
    // this.asset_id = this.assetService.asset_id;
    // console.log(this.assetId)
    // this.assetService.getAssetVitals(this.assetId).subscribe(response => {
    //   this.asset_vitals = response;
    // });
    this.securityService.getAssetSecurity().subscribe(security => {
      this.security = security;
    });
    this.settingService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.settingService.getStatuses().subscribe(statuses => {
      this.statuses = statuses;
    });
  }

  returnToYard() {
    let obj = {
      id:  this.assetId,
      lat: this.lat,
      lng: this.lng
    }
    this.assetService.deleteFromMap(obj).subscribe(response => {
      console.log(response)
      this.snackBar.open('Asset returned to yard.', "Success:", {duration: 5000});
    });
  }

  close() {
    this.cancelVitals.emit(false);
  }

}
