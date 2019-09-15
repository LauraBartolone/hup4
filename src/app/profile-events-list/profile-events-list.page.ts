import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { EventService } from '../services/event.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile-events-list',
  templateUrl: './profile-events-list.page.html',
  styleUrls: ['./profile-events-list.page.scss'],
})
export class ProfileEventsListPage implements OnInit {

  public events = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
    private apiService: ApiService) {
    }

    async ngOnInit() {
      (await this.eventService.getEventList()).subscribe(respData => {
        if (!this.apiService.hasErrors(respData)) {
          this.events = respData.response;
      } else {
        // TODO: #ERROR
      }
      });
      // this.api
  }

  public goToDetailEvent(eventId) {
    this.router.navigate(['/event-detail', eventId]);
  }
}
