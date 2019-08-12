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
    localStorage.removeItem('roleId');
    localStorage.removeItem('userId');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('braToken');
  }
  
  login() {
    this.authService.login(this.loginForm.value).subscribe(auth => {
      this.auth = auth;
      localStorage.setItem('userId', this.auth.user.id);
      localStorage.setItem('roleId', this.auth.user.role_id);
      localStorage.setItem('tenantId', this.auth.user.tenant_id);
      localStorage.setItem('braToken', this.auth.token);
      localStorage.setItem('userEmail', this.loginForm.value.email);
      this.router.navigate(['/portal'])
    });
  }

  forgotPassword() {
    this.router.navigate(['/password-forgot']);
  }

}
