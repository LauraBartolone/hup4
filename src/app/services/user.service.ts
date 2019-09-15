import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FacebookService } from './facebook.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Utils } from './utils';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: undefined;

  constructor(
    public apiService: ApiService,
    private fbService: FacebookService,
    private storage: StorageService,
    private loadingController: LoadingController,
    public alertController: AlertController
    ) {
  }

  public registration(data) {
    this.apiService.post('rest-auth/registration/',
      this.apiService.buildHeaders(),
      data
    ).subscribe(respData => {
      if (!this.apiService.hasErrors(respData)) {
        this.storage.set('user',
        {
          token: respData.response.key,
          username: data.username,
        });
      } else {
        this.showAlert(respData.errors[0]);
      }
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
      loading.dismiss();
      if (!this.apiService.hasErrors(respData)) {
        this.storage.set('user',
        {
          token: respData.response.key,
          username: data.username,
        });
      } else {
        this.showAlert(respData.errors[0]);
      }
    });
  }

  public async showAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Error!',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  public facebookLogin() {
    this.fbService.doFbLogin();
  }

  public logout() {
    this.apiService.post('rest-auth/logout/',
      this.apiService.buildHeaders('miotoken')
    ).subscribe(respData => {
      if (!this.apiService.hasErrors(respData)) {
        this.storage.remove('user');
      }
    });
  }

  public async getToken() {
     return await this.storage.get('user').then((data) => {
      if (Utils.isDefined(data.token)) {
      return data.token;
      }
    });
  }

  public async presentLoading(loading) {
    return await loading.present();
  }

}
