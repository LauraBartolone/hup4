import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { Facebook } from '@ionic-native/facebook/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuService } from './services/menu.service';
import { CoreService } from './services/core.service';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';
import { FacebookService } from './services/facebook.service';
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { StorageService } from './services/storage.service';
import { EventService } from './services/event.service';
import { AuthGuard } from './services/auth-guard.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PhotosService } from './services/photos.services';
import { PleaseLoginModalModule } from './modal/please-login/please-login.module';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, SideMenuComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PleaseLoginModalModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    SideMenuComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MenuService,
    StorageService,
    ApiService,
    EventService,
    PhotosService,
    UserService,
    CoreService,
    Facebook,
    FacebookService,
    NativeStorage,
    AuthGuard,
    JwtHelperService,
    Camera,
    ImagePicker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
