import { Component } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AuthService } from "../../service/auth.service";
import { environment } from '../../../environments/environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: any;
  token: any;
  hidePassword = true;
  tenant_id = sessionStorage.getItem('tenantId');
   
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService) { 
      this.registerForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name:  ['', Validators.required],
        email:      ['', Validators.required],
        password:   ['', Validators.required]
      })
    }
  
  register() {
    let obj = this.registerForm.value;
    this.authService.register(obj).subscribe(token => {
      sessionStorage.setItem('token', this.token);
      sessionStorage.setItem('userEmail', this.registerForm['email'].value);
      this.snackBar.open('Registration succeeded.', "Success:", {duration: 5000});
      this.router.navigate(['/portal']);
    });     
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

}


