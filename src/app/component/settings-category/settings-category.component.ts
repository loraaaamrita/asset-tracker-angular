import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar, MatTableDataSource, MatSort } from '@angular/material';

import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";
import { ICategories } from 'src/app/model/asset';
import { ICategorySecurity } from 'src/app/model/security';

@Component({
  selector: 'app-settings-category',
  templateUrl: './settings-category.component.html',
  styleUrls: ['./settings-category.component.scss']
})
export class SettingsCategoryComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  user_id = sessionStorage.getItem('userId');

  isCreate:   boolean = false;
  isUpdate:   boolean = false;
  isDelete:   boolean = false;
  isDisabled: boolean = false;
  
  security:   any;
  categories: any;

  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[];

  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.categoryForm = this.fb.group({
      category:[null]
    })
  }

  ngOnInit() {
    this.securityService.getCategorySecurity().subscribe((security: ICategorySecurity) => {
      this.security = security;
      if (this.security.category_create === true)
        this.isCreate = true;
      if (this.security.category_update === true)
        this.isUpdate = true;
      if (this.security.category_delete === true)
        this.isDelete = true;
      if (this.security.category_create === false
          && this.security.category_update === false
          && this.security.category_delete === false) {
        this.isDisabled = true;
        this.categoryForm.disable(); 
      }
      this.getCategories();
    });
  }

  getCategories() {
    this.settingService.getCategories().subscribe((categories: ICategories) => {
      this.categories = categories;
      if (this.isDisabled === true)
        this.columnsToDisplay = ['category'];
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.sort = this.sort;
      if(this.isDisabled === false) {
        this.columnsToDisplay = ['category', 'delete', 'update'];
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.sort = this.sort;
      }
    });
  }

  create() {
    let obj = this.categoryForm.value;
    obj.user_id = this.user_id;
    this.settingService.createCategory(obj).subscribe(response => {
      this.snackBar.open('Category updated.', "Success:", {duration: 5000});
      this.categoryForm.patchValue({'category': null})
      this.getCategories();
    });
  }

  update(element) {
    this.settingService.updateCategory(element).subscribe(response => {
      this.snackBar.open('Category updated.', "Success:", {duration: 5000});
    });
  }

  delete(element) {
    let obj = {id: element.id, user_id: this.user_id};
    this.settingService.deleteCategory(obj).subscribe(response => {
      this.snackBar.open('Category deleted.', "Success:", {duration: 5000});
      this.getCategories();
    });
  }

}
