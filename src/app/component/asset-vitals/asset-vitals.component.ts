import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
export class AssetVitalsComponent implements OnInit {

  @Output() cancelVitals = new EventEmitter();

  history: any;
  security: any;
  statuses: any;
  categories: any;
  asset_id: any;
  asset_vitals: any;

  assetForm: FormGroup;

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

  ngOnInit() {
    this.asset_id = this.assetService.asset_id;
    this.assetService.getAssetVitals(this.asset_id).subscribe(response => {
      this.asset_vitals = response;
      console.log(this.asset_vitals)
    });
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

  close() {
    this.cancelVitals.emit(false);
  }

}
