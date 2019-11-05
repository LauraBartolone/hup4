import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { CoreService } from 'src/app/services/core.service';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';


export interface MenuLink {
  title: string;
  linkHref: string;
  isProtected;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  public menuTitle: '';
  public isLoggedIn = false;
  public user = undefined;
  constructor(
    public menu: MenuService,
    public core: CoreService,
    private navController: NavController,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.isAuthenticate.subscribe( async resp => {
        this.isLoggedIn = resp;
        if (this.isLoggedIn) {
          this.user = await this.userService.getUser();
        }
      }
    );
    this.userService.isLoggedIn();
  }

  public navToPage(link: MenuLink) {
    console.log('Navigating to: ', link.linkHref);
    this.menu.toggle();
    try {
      this.navController.navigateForward(link.linkHref);
    } catch (e) {
      console.log(e);
    }
    // this.core.navToPage(link.linkHref);
  }

  public openMenu() {
    this.menu.toggle();
  }

  public logout() {
    this.userService.logout();
  }

  public login() {
    this.navController.navigateForward('login');
  }
}
