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
  ];
constructor(private router: Router, private platform: Platform) {
    this.platform.ready().then(() => {
      console.log('Core service init');
      this.navEvents();
    });
  }

  private navEvents() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: any) => {
      console.log(e);
      this.showHideTabs(e);
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

  private showHideTabs(e: any) {
    // Result:  e.url: "/tabs/groups/new-group?type=group"
    // Split the URL up into an array.
    const urlArray = e.url.split('/');
    // Result: urlArray: ["", "tabs", "groups", "new-group?type=group"]
    // Grab the parentUrl
    // const pageUrlParent = urlArray[urlArray.length - 2];
    // Grab the last page url.
    const pageUrl = urlArray[urlArray.length - 1];
    // Result: new-group?type=group
    const page = pageUrl.split('?')[0];
    // Result: new-group
    // Check if it's a routeParamPage that we need to hide on
    // const hideParamPage = this.routeParamPages.indexOf(pageUrlParent) > -1 && !isNaN(Number(page));
    // Check if we should hide or show tabs.
    // const shouldHide = this.hideTabBarPages.indexOf(page) > -1 || hideParamPage;
    const shouldShowSideMenu = this.showSideMenuPages.indexOf(page) > -1;
    console.log(shouldShowSideMenu);
    // Result: true
    // Not ideal to set the timeout, but I haven't figured out a better method to wait until the page is in transition...
    try {
      setTimeout(() => {
        // shouldHide ? this.hideTabs() : this.showTabs();
        this.showHideMenu(shouldShowSideMenu);
      }, 300);
    } catch (err) {
    }
  }

}
