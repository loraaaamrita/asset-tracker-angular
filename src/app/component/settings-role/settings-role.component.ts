import { Component, OnInit, ViewChild } from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';

import { NgForm, FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-settings-role',
  templateUrl: './settings-role.component.html',
  styleUrls: ['./settings-role.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SettingsRoleComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  user_id = localStorage.getItem('userId');

  isCreate:   boolean = false;
  isUpdate:   boolean = false;
  isDelete:   boolean = false;
  isDisabled: boolean = false;

  security: any;
  roles: any; 
  roleId: any;

  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['role'];

  roleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.roleForm = this.fb.group({
      role: [null]
    })
  }

  ngOnInit() {
    this.securityService.getRoleSecurity().subscribe(security => {
      this.security = security;
      if (this.security.role_create === true)
        this.isCreate = true;
      if (this.security.role_update === true)
        this.isUpdate = true;
      if (this.security.role_delete === true)
        this.isDelete = true;
      if (this.security.role_create === false
          && this.security.role_update === false
          && this.security.role_delete == false) {
        this.isDisabled = true;
        this.roleForm.disable(); 
      }
    }, error => {
      this.snackBar.open(error, "Error:", {duration: 5000})
    });
    this.getRoles();
  }

  getRoles() {
    this.settingService.getRoles().subscribe(roles => {
      this.roles = roles;
      this.dataSource = new MatTableDataSource(this.roles);
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    let obj = this.roleForm.value;
    obj.user_id = this.user_id;
    this.settingService.createRole(obj).subscribe(response => {
      this.snackBar.open('Role created.', "Success:", {duration: 5000});
      this.roleForm.patchValue({'role': null})
      this.getRoles();
    });
  }

  update(element) {
    this.settingService.updateRole(element).subscribe(response => {
      this.snackBar.open('Role updated.', "Success:", {duration: 5000});
      this.getRoles();
    });
  }

  delete(element) {
    let obj = {id: element.id, user_id: this.user_id};
    this.settingService.deleteRole(obj).subscribe(response => {
      this.snackBar.open('Role deleted.', "Success:", {duration: 5000});
      this.getRoles();
    });
  }

  setPermissionRoleId(element) {
    this.roleId = element.id;
  }

}
