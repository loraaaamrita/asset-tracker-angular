import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgmCoreModule } from '@agm/core';

import { MatButtonModule, MatDatepickerModule, MatDialogModule, MatIconModule, 
         MatInputModule, MatMenuModule, MatSelectModule, MatSnackBarModule, 
         MatTabsModule, MatTableModule, MatSortModule, MatPaginatorModule, 
         MatCardModule, MatCheckboxModule, MatListModule, MatDividerModule,
         MatExpansionModule } 
from '@angular/material';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { PipeModule } from '../pipe/pipe.module'

import { LogComponent } from './log/log.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { AssetComponent } from './asset/asset.component';
import { AssetsComponent } from './assets/assets.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AssetMapComponent } from './asset-map/asset-map.component';
import { AssetVitalsComponent } from './asset-vitals/asset-vitals.component';
import { SettingsRoleComponent } from './settings-role/settings-role.component';
import { MediaLibraryComponent } from './media-library/media-library.component';
import { BannerInternalComponent } from './banner-internal/banner-internal.component';
import { SettingsStatusComponent } from './settings-status/settings-status.component';
import { SettingsCompanyComponent } from './settings-company/settings-company.component';
import { SettingsCategoryComponent } from './settings-category/settings-category.component';
import { SettingsPermissionComponent } from './settings-permission/settings-permission.component';
import { AssetYardComponent } from './asset-yard/asset-yard.component';
import { AssetDeployComponent } from './asset-deploy/asset-deploy.component';
import { AssetLogComponent } from './asset-log/asset-log.component';

@NgModule({
  declarations: [
    LogComponent,
    UserComponent,
    UsersComponent,
    AssetComponent,
    AssetsComponent,
    ProfileComponent,
    SettingsComponent,
    AssetMapComponent,
    AssetVitalsComponent,
    SettingsRoleComponent,
    MediaLibraryComponent,
    BannerInternalComponent,
    SettingsStatusComponent,
    SettingsCompanyComponent,
    SettingsCategoryComponent,
    SettingsPermissionComponent,
    AssetYardComponent,
    AssetDeployComponent,
    AssetLogComponent
  ],
  entryComponents: [
    ProfileComponent
  ],
  exports:[
    LogComponent,
    UserComponent,
    UsersComponent,
    AssetComponent,
    AssetsComponent,
    ProfileComponent,
    AssetMapComponent,
    SettingsComponent,
    AssetDeployComponent,
    AssetVitalsComponent,
    MediaLibraryComponent,
    BannerInternalComponent
  ],
  imports: [
    PipeModule,
    FormsModule,
    CommonModule,
    MatTabsModule,
    MatSortModule,
    MatIconModule,
    MatMenuModule,
    AgmCoreModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule, 
    MatDialogModule,
    FlexLayoutModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSnackBarModule,
    NgxDropzoneModule,
    MatExpansionModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ]
})
export class ComponentModule { }
