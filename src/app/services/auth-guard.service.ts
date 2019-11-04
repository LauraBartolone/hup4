import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { UserService } from './user.service';
import { ModalController } from '@ionic/angular';
import { PleaseLoginModal } from '../modal/please-login/please-login';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
      public userService: UserService,
      private router: Router,
      private modalController: ModalController,
      ) {}

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      const isLogged: boolean = await this.userService.isLoggedIn();
      return new Promise((resolve, reject) => {
        if (isLogged) {
          resolve(true);
        } else {
          this.openPleaseLoginModal();
          resolve(false);
        }
      });

      // if (!this.userService.isLoggeedIn()) {
      //   this.router.navigate(['/login']);
      //   console.log('NONpuoi andarci');

      //   return false;
      // } else {
      //   console.log('puoi andarci');
      //   return true;
      // }
    }

    public async canLoad(route: Route): Promise<boolean> {

      const isLogged: boolean = await this.userService.isLoggedIn();
      return new Promise((resolve, reject) => {
        if (isLogged) {
          resolve(true);
        } else {
          this.openPleaseLoginModal();
          resolve(false);
        }
      });

    }

    private async openPleaseLoginModal() {
      const myModal = await this.modalController.create({
        component: PleaseLoginModal,
        cssClass: 'small-modal'
      });
      return await myModal.present();
    }

}
