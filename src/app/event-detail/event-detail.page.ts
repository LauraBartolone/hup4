import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { ApiService } from '../services/api.service';
import { MenuLink } from '../components/side-menu/side-menu.component';
import { MenuService } from '../services/menu.service';
import { StorageService } from '../services/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  public eventId: number;
  public event: any;

  constructor(private router: Router,
              private menu: MenuService,
              private route: ActivatedRoute,
              private eventService: EventService,
              private apiService: ApiService,
              private storage: StorageService,
              private navController: NavController) {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.eventId = parseInt(params.eventId);
    });
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
    this.menu.title.next('My event');
    this.menu.details.next(sideLinks);
  }

  async ngOnInit() {
    (await this.eventService.getEvent(this.eventId)).subscribe(respData => {
      if (!this.apiService.hasErrors(respData)) {
        this.event = respData.response;
        console.log(this.event);
    } else {
      // TODO: #ERROR
    }
    });
  }

  goToDashboard() {
    this.apiService.get(
      'event/' + this.event.code + '/',
      this.apiService.buildHeaders(),
    ).subscribe(respData => {
      if (respData.code === 200) {
        this.storage.set('event', {
          eventCode: this.event.code,
          board: respData.response.board,
          eventId: respData.response.id,
          image: respData.response.image,
          category: respData.response.category,
        });
        this.navController.navigateRoot(['/dashboard', this.event.code]);
      } else {
       // TODO: HANDLE ERROR
      }
    });
  }

  public goToCreateEventPage() {
    this.router.navigate(['/create-event', (this.event.category - 1) ], {
      queryParams: {
         id: this.event.id,
         name: this.event.name,
         note: this.event.note,
         date: this.event.date,
         category: this.event.category,
         image: this.event.image || null
      }
    });
  }

}
