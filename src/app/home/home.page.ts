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
      {
        title: 'I miei eventi',
        linkHref: 'profile-events-list',
      },
    ];
    this.menu.details.next(sideLinks);
  }

}
