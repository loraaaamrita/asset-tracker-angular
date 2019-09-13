import { Component, OnInit } from '@angular/core';

import { UserService } from "../../service/user.service";
import { BrandingService } from "../../service/branding.service";
import { SecurityService } from "../../service/security.service";
import { INavigationSecurity } from 'src/app/model/security';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  security: INavigationSecurity;
  
  isMenu: string;

  isAssetMap:     boolean = false;
  isAssets:       boolean = false;
  isAssetLogs:    boolean = false;
  isUsers:        boolean = false;
  isMediaLibrary: boolean = false;
  isSettings:     boolean = false;
  
  tabIndex: number;

  constructor(
    private securityService: SecurityService
  ) { }

  ngOnInit() { 

    this.securityService.getNavigationSecurity(sessionStorage.getItem('roleId'))
        .subscribe((security: INavigationSecurity) => {
      this.security = security;
      if (this.security.asset_read === true) {
        this.isAssetMap   = true;
        this.isAssets     = true;
        this.isAssetLogs  = true;
        this.isMenu = 'Asset Map';
      }
      if (this.security.company_read === true 
          || this.security.category_read === true
          || this.security.permission_read === true) 
        this.isSettings = true;
      if (this.security.user_read === true)
        this.isUsers = true;
      if (this.security.media_read === true)
        this.isMediaLibrary = true;
    });
  }

  show(menu) {
    this.isMenu = menu;
  }

}
