import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { UserService } from "../../service/user.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Output() cancelCreate = new EventEmitter();
  @Input()  isUpdate: boolean;


  user_id = sessionStorage.getItem('userId');

  roles: any;
  security: any;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.userForm = this.fb.group({
      first_name: [null],
      last_name:  [null],
      email:      [null],
      role_id:    [null],
      status:     'InActive'
    })
  }

  ngOnInit() {
    if (this.isUpdate === false)
    this.userForm.disable();
    this.settingService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  create() {
    let obj = this.userForm.value;
    obj.user_id = this.user_id;
    this.userService.createUser(obj).subscribe(response => {
      this.close();
      this.snackBar.open('User created.', "Success:", {duration: 5000});
    });
  }

  close() {
    this.cancelCreate.emit(false);
  }

}