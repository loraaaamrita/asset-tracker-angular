import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AuthService } from "../../service/auth.service";
import { environment } from '../../../environments/environment';

import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent {
  user: any;
  token: any;
  hidePassword = true;
  tenant_id = sessionStorage.getItem('tenantId');
   
  verifyForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService) { 
      this.verifyForm = this.fb.group({
        email:      ['', Validators.required],
        password:   ['', Validators.required]
      })
    }
  
  verify() {
    let obj = this.verifyForm.value;
    this.authService.verify(obj).subscribe(token => {
      sessionStorage.setItem('braToken', this.token);
      sessionStorage.setItem('userEmail', this.verifyForm.value.email);
      this.snackBar.open('Verification succeeded.', "Success:", {duration: 5000});
      this.router.navigate(['/portal']);
    });     
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

}


