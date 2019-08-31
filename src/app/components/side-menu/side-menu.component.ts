import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { CoreService } from 'src/app/services/core.service';
import { NavController } from '@ionic/angular';


export interface MenuLink {
  title: string;
  linkHref: string;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  constructor(
    public menu: MenuService,
    public core: CoreService,
    private navController: NavController,
  ) { }

  ngOnInit() {
    // same things of async pipe
    // this.menu.details.subscribe((data) => {
    //   console.log('side subscriver', data);
    // });
  }

  public navToPage(link: MenuLink) {
    console.log('Navigating to: ', link.linkHref);
    this.menu.toggle();
    this.navController.navigateForward(link.linkHref);
    // this.core.navToPage(link.linkHref);
  }

  public openMenu() {
    console.log('pop');
    this.menu.toggle();
  }
}
