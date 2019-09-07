import { Injectable } from '@angular/core';

import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  FB_APP_ID = 2336952276521386;

  constructor(
    private fb: Facebook,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
  ) { }

  public async doFbLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    // let permissions = new Array<string>();

    // the permissions your facebook app needs from the user
    const permissions = ['public_profile', 'email'];

    this.fb.login(permissions)
    .then(response => {
      const userId = response.authResponse.userID;
      console.log(response);
      // Getting name and gender properties
      this.fb.api('/me?fields=name,email', permissions)
      .then(user => {
        user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
        // now we have the users info, let's save it in the NativeStorage
        this.nativeStorage.setItem('facebook_user',
        {
          name: user.name,
          email: user.email,
          picture: user.picture
        })
        .then(() => {
          // this.router.navigate(['/user']);
          loading.dismiss();
        }, error => {
          console.log(error);
          loading.dismiss();
        });
      });
    }, error => {
      console.log(error);
      loading.dismiss();
    });
}

  public async presentLoading(loading) {
    return await loading.present();
  }
}
