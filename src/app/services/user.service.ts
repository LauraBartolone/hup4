import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FacebookService } from './facebook.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public apiService: ApiService,
    private fbService: FacebookService,
    private nativeStorage: NativeStorage,
    private loadingController: LoadingController,
    ) {
  }

  public registration(data) {
    this.apiService.post('rest-auth/registration/',
      this.apiService.buildHeaders(),
      data
    ).subscribe(respData => {
      console.log(respData);
    });
  }

  public async login(data) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.apiService.post('rest-auth/login/',
      this.apiService.buildHeaders(),
      data
    ).subscribe(respData => {
      this.nativeStorage.setItem('user',
      {
        token: respData.key,
        username: data.username,
      })
      .then(() => {
        // this.router.navigate(['/user']);
        loading.dismiss();
      }, error => {
        console.log(error);
        loading.dismiss();
      });
    });
  }

  public facebookLogin() {
    this.fbService.doFbLogin();
  }

  public logout() {
    this.apiService.post('rest-auth/logout/',
      this.apiService.buildHeaders(this.getToken())
  );
  }

  private getToken() {
    return 'mio token';
  }

  public async presentLoading(loading) {
    return await loading.present();
  }

}
