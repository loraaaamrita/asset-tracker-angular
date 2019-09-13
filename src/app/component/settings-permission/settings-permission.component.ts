import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";
import { IPermissionSecurity } from 'src/app/model/security';
import { IPermissions } from 'src/app/model/setting';

@Component({
  selector: 'app-settings-permission',
  templateUrl: './settings-permission.component.html',
  styleUrls: ['./settings-permission.component.scss']
})
export class SettingsPermissionComponent implements OnInit, OnChanges {

  @Input() roleId: number;

  user_id = sessionStorage.getItem('userId');

  isUpdate: boolean = false;

  security: any;
  permissions: any;
  permissionForm: FormGroup;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.permissionForm = this.fb.group({
      asset_create:       [null],
      asset_read:         [null],
      asset_update:       [null],
      asset_delete:       [null],
      asset_map_read:     [null],
      asset_map_update:   [null],
      asset_log_read:     [null],
      category_create:    [null],
      category_read:      [null],
      category_update:    [null],
      category_delete:    [null],
      company_read:       [null],
      company_update:     [null],
      media_create:       [null],
      media_read:         [null],
      media_update:       [null],
      media_delete:       [null],
      permission_read:    [null],
      permission_update:  [null],
      role_create:        [null],
      role_read:          [null],
      role_update:        [null],
      role_delete:        [null],
      status_create:      [null],
      status_read:        [null],
      status_update:      [null],
      status_delete:      [null],
      user_create:        [null],
      user_read:          [null],
      user_update:        [null],
      user_delete:        [null]
    })
  }

  ngOnInit() {
    this.securityService.getPermissionSecurity().subscribe((security: IPermissionSecurity) => {
      this.security = security;
      if (this.security.role_update === true)
        this.isUpdate = true;
      else
        this.permissionForm.disable(); 
    });
    this.getPermissions();
  }

  ngOnChanges() { 
    // this.getPermissions();
  }

  create() {
    let obj = this.permissionForm.value;
    obj.role_id = this.roleId;
    obj.user_id = this.user_id;
    this.settingService.createPermissions(obj).subscribe(response => {
      this.snackBar.open('Permissions updated.', "Success:", {duration: 5000});
    });
  }

  update() {
    let obj = this.permissionForm.value;
    obj.role_id = this.roleId;
    this.settingService.updatePermissions(obj).subscribe(response => {
      this.snackBar.open('Permissions updated.', "Success:", {duration: 5000});
    });
  }

  getPermissions() { 
    this.settingService.getPermissions(this.roleId).subscribe((permissions: IPermissions) => {
      this.permissions = permissions;
      if (this.permissions !== null) {
        this.permissionForm.setValue({
          asset_create:       this.permissions.asset_create,
          asset_read:         this.permissions.asset_read,
          asset_update:       this.permissions.asset_update,
          asset_delete:       this.permissions.asset_delete,
          asset_map_read:     this.permissions.asset_map_read,
          asset_map_update:   this.permissions.asset_map_update,
          asset_log_read:     this.permissions.asset_log_read,
          category_create:    this.permissions.category_create,
          category_read:      this.permissions.category_read,
          category_update:    this.permissions.category_update,
          category_delete:    this.permissions.category_delete,
          company_read:       this.permissions.company_read,
          company_update:     this.permissions.company_update,
          media_create:       this.permissions.media_create,
          media_read:         this.permissions.media_read,
          media_update:       this.permissions.media_update,
          media_delete:       this.permissions.media_delete,
          permission_read:    this.permissions.permission_read,
          permission_update:  this.permissions.permission_update,
          role_create:        this.permissions.role_create,
          role_read:          this.permissions.role_read,
          role_update:        this.permissions.role_update,
          role_delete:        this.permissions.role_delete,
          status_create:      this.permissions.status_create,
          status_read:        this.permissions.status_read,
          status_update:      this.permissions.status_update,
          status_delete:      this.permissions.status_delete,
          user_create:        this.permissions.user_create,
          user_read:          this.permissions.user_read,
          user_update:        this.permissions.user_update,
          user_delete:        this.permissions.user_delete
        });
      } 
    });
  }

  clearAll() {
    this.permissionForm.patchValue({
      asset_create:       false,
      asset_read:         false,
      asset_update:       false,
      asset_delete:       false,
      asset_map_read:     false,
      asset_map_update:   false,
      asset_log_read:     false,
      category_create:    false,
      category_read:      false,
      category_update:    false,
      category_delete:    false,
      company_read:       false,
      company_update:     false,
      media_create:       false,
      media_read:         false,
      media_update:       false,
      media_delete:       false,
      permission_read:    false,
      permission_update:  false,
      role_create:        false,
      role_read:          false,
      role_update:        false,
      role_delete:        false,
      status_create:      false,
      status_read:        false,
      status_update:      false,
      status_delete:      false,
      user_create:        false,
      user_read:          false,
      user_update:        false,
      user_delete:        false
    });
  }

  selectAll() {
    this.permissionForm.patchValue({
      asset_create:       true,
      asset_read:         true,
      asset_update:       true,
      asset_delete:       true,
      asset_map_read:     true,
      asset_map_update:   true,
      asset_log_read:     true,
      category_create:    true,
      category_read:      true,
      category_update:    true,
      category_delete:    true,
      company_read:       true,
      company_update:     true,
      media_create:       true,
      media_read:         true,
      media_update:       true,
      media_delete:       true,
      permission_read:    true,
      permission_update:  true,
      role_create:        true,
      role_read:          true,
      role_update:        true,
      role_delete:        true,
      status_create:      true,
      status_read:        true,
      status_update:      true,
      status_delete:      true,
      user_create:        true,
      user_read:          true,
      user_update:        true,
      user_delete:        true
    }); 
  }

}
