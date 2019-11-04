import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { MenuLink } from '../components/side-menu/side-menu.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public homeForm: FormGroup;
  public submitted = false;
  public errorCode = '';

  constructor(
    private menu: MenuService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private apiService: ApiService,
    private storage: StorageService,
    ) {
    this.homeForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
   }

  get f() { return this.homeForm.controls; }

  public onSubmit(ev: any): void {
    this.submitted = true;
    if (this.homeForm.valid) {
      this.apiService.get(
        'event/' + this.homeForm.value.code + '/',
        this.apiService.buildHeaders(),
      ).subscribe(respData => {
        if (respData.code === 200) {
          this.storage.set('event', {
            eventCode: this.homeForm.value.code,
            board: respData.response.board,
            eventId: respData.response.id,
          });
          this.navController.navigateRoot(['/dashboard', this.homeForm.value.code]);
        } else {
          console.log(respData);
          this.errorCode = 'codice errato';
        }
      });
    }
  }

  public changeInput() {
    this.errorCode = '';
  }

  ionViewWillEnter() {
    const sideLinks: MenuLink[] = [
      {
        isProtected: false,
        title: 'Create event',
        linkHref: 'create-event-category',
      },
      {
        isProtected: true,
        title: 'My events',
        linkHref: 'profile-events-list',
      },
    ];
    this.menu.details.next(sideLinks);
  }

}
