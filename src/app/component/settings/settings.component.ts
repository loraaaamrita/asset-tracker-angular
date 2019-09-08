import { Component, OnInit } from '@angular/core';

import { SecurityService } from "../../service/security.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  security: any;

  isCompany:          boolean = false;
  isCategory:         boolean = false;
  isStatus:           boolean = false;
  isAssetSettings:    boolean = false;
  isRolesPermission:  boolean = false;

  constructor(private securityService: SecurityService) { }

  ngOnInit() {
    this.securityService.getSettingsSecurity().subscribe(security => {
      this.security = security;
      if (this.security.company_read === true)
        this.isCompany = true;
      if (this.security.category_read === true || this.security.status_read === true)
        this.isAssetSettings = true;
      if (this.security.category_read === true)
        this.isCategory = true;
      if (this.security.status_read === true)
        this.isStatus = true;
      if (this.security.permission_read === true || this.security.role_read === true)
        this.isRolesPermission = true;
    });
  }

}
