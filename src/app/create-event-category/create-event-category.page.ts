import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event-category',
  templateUrl: './create-event-category.page.html',
  styleUrls: ['./create-event-category.page.scss'],
})
export class CreateEventCategoryPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public goToCreateEvent(category: number) {
    this.router.navigate(['/create-event', category]);
  }
}
