import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { AuthService } from "../../service/auth.service";

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  auth: any;
  hidePassword = true;
   
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService) { 
      this.loginForm = this.fb.group({
        email:    ['', Validators.required],
        password: ['', Validators.required]
      })
    }

  ngOnInit() {
    sessionStorage.removeItem('roleId');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('tenantId');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('token');
  }
  
  login() {
    this.authService.login(this.loginForm.value).subscribe(auth => {
      this.auth = auth;
      sessionStorage.setItem('userId', this.auth.user.id);
      sessionStorage.setItem('roleId', this.auth.user.role_id);
      sessionStorage.setItem('tenantId', this.auth.user.tenant_id);
      sessionStorage.setItem('token', this.auth.token);
      sessionStorage.setItem('userEmail', this.loginForm.value.email);
      this.router.navigate(['/portal'])
    });
  }

  forgotPassword() {
    this.router.navigate(['/password-forgot']);
  }

}
