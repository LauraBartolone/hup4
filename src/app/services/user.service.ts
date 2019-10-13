import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FacebookService } from './facebook.service';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
import { Utils } from './utils';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: undefined;

  public isAuthenticate = new BehaviorSubject(false);


  constructor(
    public apiService: ApiService,
    private fbService: FacebookService,
    private storage: StorageService,
    private loadingController: LoadingController,
    public alertController: AlertController) {
    }

  public isTokenExpired(token) {
    const helper = new JwtHelperService();
    // console.log('decoded', helper.decodeToken(token));
    return helper.isTokenExpired(token);
  }

  public registration(data) {
    this.apiService.post('rest-auth/registration/',
      this.apiService.buildHeaders(),
      data
    ).subscribe(respData => {
      if (!this.apiService.hasErrors(respData)) {
        this.storage.set('user',
        {
          token: respData.response.token,
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
          token: respData.response.token,
          username: data.username,
        });

        this.isAuthenticate.next(true);
      } else {
        this.showAlert(respData.errors[0]);
        this.isAuthenticate.next(false);
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
        this.isAuthenticate.next(false);
      }
    });
  }

  public async checkIfIsLoggedIn() {
    return await this.storage.get('user').then((response) => {
      const jsonObject = response;
      if (Utils.isDefined(jsonObject.token) && !this.isTokenExpired(jsonObject.token)) {
        this.isAuthenticate.next(true);
        return true;
      } else {
        this.isAuthenticate.next(false);
        return false;
      }
    }).catch(err => {
        this.isAuthenticate.next(false);
        return false;
      } );
  }

  public isLoggeedIn(): boolean {
    return this.isAuthenticate.value;
  }

  public async getToken() {
     return await this.storage.get('user').then((data) => {
      // data = JSON.parse(data);
      if (Utils.isDefined(data.token)) {
      return data.token;
      }
    });
  }

  public async getUser() {
    return await this.storage.get('user').then((data) => {
    //  data = JSON.parse(data);
     if (Utils.isDefined(data)) {
     return data;
     }
   });
  }

  public async presentLoading(loading) {
    return await loading.present();
  }

}
