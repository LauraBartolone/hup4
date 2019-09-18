import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  public eventId: number;
  public event: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService,
              private apiService: ApiService) {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.eventId = parseInt(params.eventId);
    });
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

  public goToCreateEventPage() {
    this.router.navigate(['/create-event', this.event.category], {
      queryParams: {
         id: this.event.id,
         name: this.event.name,
         note: this.event.note,
         date: this.event.date,
         category: this.event.category
         // TODO: add image
      }
    });
  }

}
