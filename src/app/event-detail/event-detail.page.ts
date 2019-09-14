import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToCreateEventPage() {
    this.router.navigate(['/create-event', 1]);
  }
}
