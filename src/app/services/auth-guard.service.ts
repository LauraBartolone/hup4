import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { UserService } from './user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanLoad, CanActivate {
    constructor(
      public userService: UserService,
      private router: Router) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      if (!this.userService.isLoggeedIn()) {
        this.router.navigate(['/login']);
        console.log('NONpuoi andarci');

        return false;
      } else {
        console.log('puoi andarci');
        return true;
      }
    }

    public canLoad(route: Route): boolean {

      if (!this.userService.isLoggeedIn()) {
        this.router.navigate(['/login']);
        console.log('NONpuoi andarci');

        return false;
      } else {
        console.log('puoi andarci');
        return true;
      }

    }

}
