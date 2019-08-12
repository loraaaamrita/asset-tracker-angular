import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-settings-status',
  templateUrl: './settings-status.component.html',
  styleUrls: ['./settings-status.component.scss']
})
export class SettingsStatusComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  user_id = localStorage.getItem('userId');
  
  isCreate:   boolean = false;
  isUpdate:   boolean = false;
  isDelete:   boolean = false;
  isDisabled: boolean = false;

  security: any;
  statuses: any
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[];

  statusForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.statusForm = this.fb.group({
      status: [null]
    })
  }
  ngOnInit() {
    this.securityService.getStatusSecurity().subscribe(security => {
      this.security = security;
      if (this.security.status_create === true)
        this.isCreate = true;
      if (this.security.status_update === true)
        this.isUpdate = true;
      if (this.security.status_delete === true)
        this.isDelete = true;
      if (this.security.status_create === false
          && this.security.status_update === false
          && this.security.status_delete === false) {
        this.isDisabled = true;
        this.statusForm.disable(); 
      }
      this.getStatuses();
    });
  } 

  getStatuses() {
    this.settingService.getStatuses().subscribe(response => {
      this.statuses = response;
      if (this.isDisabled === true)
        this.columnsToDisplay = ['status'];
      else
        this.columnsToDisplay = ['status', 'delete', 'update'];
      this.dataSource = new MatTableDataSource(this.statuses);
      this.dataSource.sort = this.sort;
    });
  }

  create() {
    let obj = this.statusForm.value;
    obj.user_id = this.user_id;
    this.settingService.createStatus(obj).subscribe(response => {
      this.snackBar.open('Status updated.', "Success:", {duration: 5000});
      this.statusForm.patchValue({'status': null})
      this.getStatuses();
    });
  }

  update(element) {
    this.settingService.updateStatus(element).subscribe(response => {
      this.snackBar.open('Status updated.', "Success:", {duration: 5000});
    });
  }

  delete(element) {
    let obj = {id: element.id, user_id: this.user_id};
    this.settingService.deleteStatus(obj).subscribe(response => {
      this.snackBar.open('Status updated.', "Success:", {duration: 5000});
      this.getStatuses();
    });
  }

}

