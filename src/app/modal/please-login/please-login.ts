import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'modal-please-login',
  templateUrl: './please-login.html',
  styleUrls: ['./please-login.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class PleaseLoginModal {

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    private storage: StorageService
    ) {

  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public goToLogin() {
    this.storage.set('loginRedirect', {
      url: this.router.url,
    });
    this.modalCtrl.dismiss();
    this.router.navigate(['/login']);


  }
}
