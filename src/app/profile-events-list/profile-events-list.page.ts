import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { AlertController } from '@ionic/angular';
import { MenuLink } from '../components/side-menu/side-menu.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-profile-events-list',
  templateUrl: './profile-events-list.page.html',
  styleUrls: ['./profile-events-list.page.scss'],
})
export class ProfileEventsListPage {

  public events = [];

  constructor(
    private router: Router,
    public alertController: AlertController,
    public eventService: EventService,
    private menu: MenuService) {
    }

  public goToDetailEvent(eventId) {
    this.router.navigate(['/event-detail', eventId]);
  }

  public deleteEvent(eventId) {
    this.presentAlertConfirm(eventId);
  }

  public savePhotos(eventId) {
    this.eventService.downloadPhoto(eventId);
  }

  async presentAlertConfirm(eventId) {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Unsaved photos will be lost! Are you sure you want to continue?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Delete event',
          handler: () => {
            this.eventService.deleteEvent(eventId);
          }
        }
      ]
    });

    await alert.present();
  }
  ionViewWillEnter() {
    this.eventService.getEventList();
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
    this.menu.title.next('My events list');
    this.menu.details.next(sideLinks);
  }
}
