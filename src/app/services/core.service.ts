import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  showSideMenuPages: string[] = [
    'home',
    'dashboard',
    'profile-events-list',
  ];
constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      this.initMenu();
    });
  }

  private initMenu() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      this.getRoute(e);
    });
  }

  public showHideMenu(show: boolean = false) {
    try {
      const menu = document.getElementById('slidingMenu');
      const headerMenu = document.getElementById('headerMenu');
      if (show && menu.style.display !== 'initial') {
        menu.style.display = 'initial';
        headerMenu.style.display = 'initial';
      } else if (!show && menu.style.display !== 'none') {
        menu.style.display = 'none';
        headerMenu.style.display = 'none';
      }
    } catch (err) {}
  }

  private getRoute(e: any) {
    const urlArray = e.url.split('/');
    const pageUrl = urlArray[1];
    const page = pageUrl.split('?')[0];
    const shouldShowSideMenu = this.showSideMenuPages.indexOf(page) > -1;
    try {
      setTimeout(() => {
        // shouldHide ? this.hideTabs() : this.showTabs();
        this.showHideMenu(shouldShowSideMenu);
      }, 300);
    } catch (err) {
    }
  }

}
