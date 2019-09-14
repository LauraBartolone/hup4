import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-please-login',
  templateUrl: './please-login.html',
  styleUrls: ['./please-login.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class PleaseLoginModal {

  constructor(
    private router: Router,
    public modalCtrl: ModalController) {

  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public goToLogin() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/login']);


  }
}
