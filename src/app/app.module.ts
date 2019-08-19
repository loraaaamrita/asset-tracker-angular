import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { ExternalModule } from './external/external.module';
import { InternalModule } from './internal/internal.module';

import { AgmCoreModule } from '@agm/core';

import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { YardService } from './service/yard.service';
import { ErrorService } from './service/error.service';
import { AssetService } from './service/asset.service';
import { MediaService } from './service/media.service';
import { SettingService } from './service/setting.service';
import { BrandingService } from './service/branding.service';
import { SecurityService } from './service/security.service';
import { AuthGuardService } from './service/auth-guard.service';

import { HttpConfig} from './interceptor/httpconfig.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ExternalModule,
    InternalModule
    ,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCv8CrVsJwSlXmuYea_5NcskBpXrpHD2kQ'
    })
  ],
  providers: [
    AuthService,
    UserService,
    YardService,
    MediaService,
    ErrorService,
    AssetService,
    SettingService,
    BrandingService,
    SecurityService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, 
      useClass: HttpConfig, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
