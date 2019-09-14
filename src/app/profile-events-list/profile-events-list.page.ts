import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-events-list',
  templateUrl: './profile-events-list.page.html',
  styleUrls: ['./profile-events-list.page.scss'],
})
export class ProfileEventsListPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToDetailEvent() {
    this.router.navigate(['/event-detail']);
  }
}
