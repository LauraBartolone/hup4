import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
      public userService: UserService,
      private router: Router) {}

    public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      const isLogged: boolean = await this.userService.checkIfIsLoggedIn();

      console.log('isLogged', isLogged);
      return new Promise((resolve, reject) => {
        if (isLogged) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
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

      const isLogged: boolean = await this.userService.checkIfIsLoggedIn();
      console.log('isLogged', isLogged);

      return new Promise((resolve, reject) => {
        if (isLogged) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });

    }

}
