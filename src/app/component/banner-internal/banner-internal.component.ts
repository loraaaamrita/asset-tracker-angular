import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MatSnackBar, MatSort, MatDialog, MatDialogRef, MatDialogConfig } 
from '@angular/material';

import { ProfileComponent } from '../profile/profile.component';

import { UserService } from "../../service/user.service";
import { BrandingService } from "../../service/branding.service";

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-banner-internal',
  templateUrl: './banner-internal.component.html',
  styleUrls: ['./banner-internal.component.scss']
})
export class BannerInternalComponent implements OnInit {

  baseUrl = environment.baseUrl;
  user_email = sessionStorage.getItem('userEmail');
  
  user: any;
  branding: any;
  companyLogo: string;
  profileImage: string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private brandingService: BrandingService
  ) { }

  ngOnInit() {
    this.brandingService.getCompanyLogo().subscribe(branding => {
      this.branding = branding;
      this.companyLogo = this.baseUrl+'profiles/'+
                         this.branding.tenant_id+'/'+
                         this.branding.company_image;
    });
    this.userService.getUserEmail().subscribe(user => {
      this.user = user;
      this.profileImage = this.baseUrl+'profiles/'+
                          this.branding.tenant_id+'/'+
                          this.user.profile_image;
      sessionStorage.setItem('userId', this.user.id);
      sessionStorage.setItem('roleId', this.user.role_id);
    });
  }

  profile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = { right: '20px', top: '50px'};
    dialogConfig.width = '350px';
    const dialogRef = this.dialog.open(ProfileComponent, dialogConfig);
  }

  logout() {
    sessionStorage.removeItem('roleId');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('tenantId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('braToken');
    this.router.navigate(['/login']);
  }

}

