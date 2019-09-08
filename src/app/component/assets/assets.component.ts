import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator, MatDialog, 
         MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } 
from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

import { environment } from '../../../environments/environment';

import { IAssets } from "../../model/assets";
import { IAssetSecurity } from "../../model/asset-security";
import { IAssetLog } from 'src/app/model/asset-log';
import { ICategories } from 'src/app/model/categories';
import { IStatuses } from 'src/app/model/statuses';


@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssetsComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  baseUrl = environment.baseUrl;
  tenant_id = sessionStorage.getItem('tenantId');
  user_id = sessionStorage.getItem('userId');

  isCreate: boolean = false;
  isUpdate: boolean = false;
  isDelete: boolean = false;
  
  assets: any;
  history: any;
  security: any;
  statuses: any;
  categories: any;
  isNewAsset: boolean = false;
  isHistory: boolean = false;
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['image', 'name', 'unit_number', 'category', 'status', 
                                'date_created'];

  assetForm: FormGroup;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private assetService: AssetService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.assetForm = this.fb.group({
      name:         [null, Validators.required],
      unit_number:  [null, Validators.required],
      category:     [null, Validators.required],
      status:       [null, Validators.required]
    })
  }

  ngOnInit() {
    this.getAssets();
    this.securityService.getAssetSecurity().subscribe((security: IAssetSecurity) => {
      this.security = security;
      console.log(this.security)
      if (this.security.asset_create === true)
        this.isCreate = true;
      if (this.security.asset_update === true) 
        this.isUpdate = true;
      if (this.security.asset_delete === true)
        this.isDelete = true;
      if (this.security.asset_delete === false
          && this.security.asset_update === false
          && this.security.asset_delete == false)
        this.assetForm.disable()
    });
    this.settingService.getCategories().subscribe((response: ICategories) => {
      this.categories = response;
    });
    this.settingService.getStatuses().subscribe((response: IStatuses) => {
      this.statuses = response;
    });
    
  }

  newAsset() {
    this.isNewAsset = true;
  }

  cancelCreate() {
    this.isNewAsset = false;
    this.getAssets();
  }

  refreshAssets() {
    this.isNewAsset = false;
    this.snackBar.open('New well created.', "Success:", {duration: 5000});
    this.getAssets();
  }

  getAssets() {
    this.assetService.getAssets().subscribe((assets: IAssets) => {
      this.assets = assets;
      this.assets.forEach(element => {
        if (element.file_name !== null) {
          let thumb = element.file_name.replace(/\.[^/.]+$/, "")
          let extension = element.file_name.split('.').pop();
          element.thumb = thumb+'_thumb.'+extension;
        }
      })
      this.dataSource = new MatTableDataSource(this.assets);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  updateForm(element) {
    this.assetForm.controls['name']         .setValue(element.name);
    this.assetForm.controls['status']       .setValue(element.status_id);
    this.assetForm.controls['category']     .setValue(element.category_id);
    this.assetForm.controls['unit_number']  .setValue(element.unit_number);
  }

  update(id) {
    let obj = this.assetForm.value;
    obj.id = id;
    this.assetService.updateAsset(obj).subscribe(response => {
      this.snackBar.open('Asset updated.', "Success:", {duration: 5000});
      this.getAssets();
    });
  }

  delete(id) {
    let obj = {id: id, user_id: this.user_id};
    this.assetService.deleteAsset(obj).subscribe(response => {
      this.snackBar.open('Asset deleted.', "Success:", {duration: 5000});
      this.getAssets();
    });
  }

  showHistory(element) {
    this.isHistory = true;
    this.assetService.getAssetHistory(element.id).subscribe((response: IAssetLog) => {
      this.history = response;
    });
  }

  hideHistory() {
    this.isHistory = false;
  }

}


