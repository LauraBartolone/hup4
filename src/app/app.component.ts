import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from 'src/themes/ionic/services/language.service';
import { CoreService } from './services/core.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StorageService, StorageType } from './services/storage.service';
import { Utils } from './services/utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService: LanguageService,
    public core: CoreService,
    public storage: StorageService,
    private nativeStorage: NativeStorage,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.languageService.setInitialAppLanguage();
      if (this.platform.is('cordova')) {
        this.storage.setNative(this.nativeStorage);
        this.storage.init(StorageType.native);
        console.log('sono in mobile!!');
      } else {
        this.storage.init(StorageType.local);
        console.log('sono nel browser!!');
      }
      const event = await this.storage.get('event').then(async (data) => {
        return data;
      });
      if (Utils.isDefined(event)) {
        await this.navController.navigateRoot(['/dashboard', event.eventCode]);
      }
      this.splashScreen.hide();
    });
  }
}
