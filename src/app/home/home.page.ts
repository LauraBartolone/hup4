import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuLink } from '../components/side-menu/side-menu.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public homeForm: FormGroup;

  constructor(
    private menu: MenuService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    ) {
    this.homeForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
   }

  get f() { return this.homeForm.controls; }

  public onSubmit(ev: any): void {
    if (this.homeForm.valid) {
      this.navController.navigateRoot(['/dashboard', this.homeForm.value.code]);
    }
  }

  ionViewWillEnter() {
    const sideLinks: MenuLink[] = [
      {
        title: 'Crea evento',
        linkHref: 'create-event-category',
      },
      {
        title: 'I miei eventi',
        linkHref: 'profile-events-list',
      },
    ];
    this.menu.details.next(sideLinks);
  }

}
