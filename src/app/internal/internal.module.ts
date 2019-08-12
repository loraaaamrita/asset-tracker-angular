import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule, MatCheckboxModule, MatCardModule, MatIconModule, MatButtonModule,
         MatSnackBarModule, MatSelectModule, MatSidenavModule, MatListModule } 
from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComponentModule } from '../component/component.module';

import { PortalComponent } from './portal/portal.component';

@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ComponentModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ]
})
export class InternalModule { }
