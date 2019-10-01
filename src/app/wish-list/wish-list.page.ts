import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  public eventCode = '';
  constructor(
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.eventCode = params.eventCode;
    });
  }

  ngOnInit() {
  }

}
