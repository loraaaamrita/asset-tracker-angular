import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatSnackBar, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { UserStatuses } from '../../constants/constants';

import { UserService } from "../../service/user.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";
import { IUserSecurity } from 'src/app/model/security';
import { IRoles } from 'src/app/model/setting';
import { IUsers } from 'src/app/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  user_id = sessionStorage.getItem('userId');

  isCreate:   boolean = false;
  isUpdate:   boolean = false;
  isDelete:   boolean = false;

  users: any;
  
  roles: IRoles;
  security: IUserSecurity;
  statuses = UserStatuses;
  isNewUser: boolean = false;
  dataSource: MatTableDataSource<any>;

  columnsToDisplay: string[] = ['first_name', 'last_name', 'email', 'role', 
                                'status', 'date_created'];

  userForm: FormGroup;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.userForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name:  [null, Validators.required],
      email:      [null, Validators.required],
      role:       [null, Validators.required],
      status:     [null, Validators.required]
    })
  }

  ngOnInit() {
    this.securityService.getUserSecurity().subscribe((security: IUserSecurity) => {
      this.security = security;
      if (this.security.user_create === true)
        this.isCreate = true;
      if (this.security.user_update === true) 
        this.isUpdate = true;
      if (this.security.user_delete === true)
        this.isDelete = true;
      if (this.security.user_create === false
          && this.security.user_update === false
          && this.security.user_delete == false)
        this.userForm.disable();
    });
    this.getUsers();
  }

  newUser() {
    this.isNewUser = true;
  }

  cancelCreate() {
    this.isNewUser = false;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: IUsers) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  updateForm(element) {
    this.settingService.getRoles().subscribe((roles: IRoles) => {
      this.roles = roles;
    });
    this.userForm.controls['first_name']  .setValue(element.first_name);
    this.userForm.controls['last_name']   .setValue(element.last_name);
    this.userForm.controls['email']       .setValue(element.email);
    this.userForm.controls['role']        .setValue(element.role);
    this.userForm.controls['status']      .setValue(element.status);
  }

  update(id) {
    let obj = this.userForm.value;
    obj.id = id;
    this.userService.updateUser(obj).subscribe(response => {
      this.snackBar.open('User updated.', "Success:", {duration: 5000});
    });
  }

  delete(id) {
    let obj = {user_id: this.user_id, id: id};
    this.userService.deleteUser(obj).subscribe(response => {
      this.snackBar.open('User deleted.', "Success:", {duration: 5000});
    });
  }

}



