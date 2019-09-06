import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MediaService } from "../../service/media.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

import { environment } from '../../../environments/environment';

import { ICompanySecurity } from 'src/app/model/company-security';

@Component({
  selector: 'app-settings-company',
  templateUrl: './settings-company.component.html',
  styleUrls: ['./settings-company.component.scss']
})
export class SettingsCompanyComponent implements OnInit {

  baseUrl = environment.baseUrl;
  tenant_id = localStorage.getItem('tenantId');
  user_id = localStorage.getItem('userId');

  isUpdate:   boolean = false;
  isDelete:   boolean = false;

  security:     any;
  company:      any;
  company_id:   any;
  company_image: string;
  companyImage: any;
  companyForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private mediaService: MediaService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.companyForm = this.fb.group({
      company_name:       [null],
      first_name:         [null],
      last_name:          [null],
      email:              [null],
      address_street:     [null],
      address_city:       [null],
      address_prov_state: [null],
      address_country:    [null],
      address_postal_zip: [null],
    })
  }

  ngOnInit() {
    this.securityService.getCompanySecurity().subscribe(security => {
      this.security = security;
      if (this.security.company_update === true)
        this.isUpdate = true;
      if (this.security.company_update === false)
        this.companyForm.disable();
    });
    this.getCompany();
  }

  onFilesAdded(files: File[]) {
    files.forEach(file => {
      var file_name = file.name;
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
  
        this.companyImage = {
          id: this.company_id,
          file_name: file_name,
          content: content
        }
      };
      reader.readAsDataURL(file);       
    });
  }

  getCompany() {
    this.settingService.getCompany().subscribe((company: ICompanySecurity) => {
      this.company = company;
      this.company_id = this.company.id;
      this.company_image = this.company.company_image;
      this.companyForm.patchValue({
        company_name:       this.company.company_name,
        first_name:         this.company.first_name,
        last_name:          this.company.last_name,
        email:              this.company.email,
        address_street:     this.company.address_street,
        address_city:       this.company.address_city,
        address_prov_state: this.company.address_prov_state,
        address_country:    this.company.address_country,
        address_postal_zip: this.company.address_postal_zip
      })
    });
  }

  saveCompanyImage() {
    this.mediaService.saveCompanyImage(this.companyImage).subscribe(response => {
      this.getCompany();
      this.companyImage = undefined;
      this.snackBar.open('Company image uploaded', "Success:", {duration: 5000});
    });
  }

  create() {
    let obj = this.companyForm.value;
    obj.user_id = this.user_id;
    this.settingService.createCompany(obj).subscribe(response => {
      this.snackBar.open('Company created.', "Success:", {duration: 5000});
    });
  }

  update() {
    let obj = this.companyForm.value;
    obj.id = this.company_id;
    this.settingService.updateCompany(obj).subscribe(response => {
      this.snackBar.open('Company updated.', "Success:", {duration: 5000});
    });
  }

}
