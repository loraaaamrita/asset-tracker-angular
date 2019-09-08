import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

import { IAssetVitals, ICategories, IStatuses } from "../../model/asset";
import { IAssetSecurity } from "../../model/security";

@Component({
  selector: 'app-asset-vitals',
  templateUrl: './asset-vitals.component.html',
  styleUrls: ['./asset-vitals.component.scss']
})
export class AssetVitalsComponent implements OnInit, OnChanges {

  @Input()  assetId: number;
  @Input()  isUpdateMap: boolean;
  @Input()  isUpdateAsset: boolean;
  @Output() cancelVitals = new EventEmitter();
  @Output() refreshMarkers = new EventEmitter();

  security:     IAssetSecurity;
  statuses:     IStatuses;
  categories:   ICategories;
  asset_vitals: IAssetVitals;

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
    this.assetService.getAssetVitals(this.assetId)
        .subscribe((asset_vitals: IAssetVitals) => {
      this.asset_vitals = asset_vitals;
    });
  }

  ngOnInit() {
    this.securityService.getAssetSecurity().subscribe((security: IAssetSecurity) => {
      this.security = security;
    });
    this.settingService.getCategories().subscribe((categories: ICategories) => {
      this.categories = categories;
    });
    this.settingService.getStatuses().subscribe((statuses: IStatuses) => {
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
      this.close();
      this.refreshMarkers.emit();
      this.snackBar.open('Asset returned to yard.', "Success:", {duration: 5000});
    });
  }

  close() {
    this.refreshMarkers.emit();
    this.cancelVitals.emit(false);
  }

}
