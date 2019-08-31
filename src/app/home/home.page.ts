import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuLink } from '../components/side-menu/side-menu.component';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private menu: MenuService) { }

  ionViewWillEnter() {
    const sideLinks: MenuLink[] = [
      {
        title: 'Crea evento',
        linkHref: 'create-event-category',
      },
      {
        title: 'Login',
        linkHref: 'login',
      },
    ];
    this.menu.details.next(sideLinks);
  }

  public openMenu() {
    console.log('pop');
    this.menu.toggle();
  }

}
