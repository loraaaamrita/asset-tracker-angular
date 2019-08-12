import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  user_id = localStorage.getItem('userId');

  @Output() cancelCreate = new EventEmitter();

  token: any;
  history: any;
  security: any;
  statuses: any;
  categories: any;

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
    this.securityService.getAssetSecurity().subscribe(security => {
      this.security = security;
    }, error => {
      this.snackBar.open(error, "Error:", {duration: 5000})
    });
    this.settingService.getCategories().subscribe(response => {
      this.categories = response;
    }, error => 
      this.snackBar.open(error.error, "Error:", {duration: 5000})
    );
    this.settingService.getStatuses().subscribe(response => {
      this.statuses = response;
    }, error => 
      this.snackBar.open(error.error, "Error:", {duration: 5000})
    );
  }

  create() {
    let obj = this.assetForm.value;
    obj.user_id = this.user_id;
    this.assetService.createAsset(obj).subscribe(response => {
      this.close();
      this.snackBar.open('Asset updated.', "Success:", {duration: 5000});
    });
  }

  close() {
    this.cancelCreate.emit(false);
  }

}
