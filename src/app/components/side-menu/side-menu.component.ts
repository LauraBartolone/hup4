import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { CoreService } from 'src/app/services/core.service';
import { NavController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { Utils } from '../../services/utils';
import { EventService } from '../../services/event.service';


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
  public isActiveEvent = false;
  public user = undefined;
  constructor(
    public menu: MenuService,
    public core: CoreService,
    private navController: NavController,
    private userService: UserService,
    private router: Router,
    private storage: StorageService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.userService.isAuthenticate.subscribe( async resp => {
        this.isLoggedIn = resp;
        if (this.isLoggedIn) {
          this.user = await this.userService.getUser();
        }
      }
    );
    this.eventService.isActiveEvent.subscribe( async resp => {
      this.isActiveEvent = resp;
    }
  );

    this.userService.isLoggedIn();
  }

  public leaveEvent() {
    this.storage.remove('event');
    this.eventService.isActiveEvent.next(false);
    this.menu.close();
    this.navController.navigateRoot('/');
  }

  public joinEvent() {
    this.menu.close();
    this.navController.navigateRoot('/home');
  }

  public navToPage(link: MenuLink) {
    console.log('Navigating to: ', link.linkHref);
    this.menu.close();
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
    this.storage.set('loginRedirect', {
      url: this.router.url,
    });
    this.navController.navigateForward('login');
    this.menu.close();
  }
}
