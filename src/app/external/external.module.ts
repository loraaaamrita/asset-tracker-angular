import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatCheckboxModule, MatCardModule, MatIconModule, MatButtonModule,
         MatSnackBarModule, MatRadioModule, MatSelectModule, MatStepperModule } 
from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { RegisterComponent } from './register/register.component';
import { PasswordForgotComponent } from './password-forgot/password-forgot.component';
import { BannerExternalComponent } from '../component/banner-external/banner-external.component';


@NgModule({
  declarations: [
    LoginComponent, 
    VerifyComponent,
    RegisterComponent, 
    PasswordForgotComponent,
    BannerExternalComponent,
    
  ],
  imports: [
    FormsModule,
    CommonModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatCheckboxModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class ExternalModule { }
