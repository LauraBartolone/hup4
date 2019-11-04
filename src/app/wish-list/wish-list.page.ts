import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { UserService } from '../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.page.html',
  styleUrls: ['./wish-list.page.scss'],
})
export class WishListPage implements OnInit {

  public username = '';
  public eventCode = '';
  public messageForm: FormGroup;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private eventService: EventService,
  ) {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.eventCode = params.eventCode;
    });
    this.messageForm = this.formBuilder.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(3000)])]
    });
  }

  public async onSubmit(ev: any) {
    if (this.messageForm.valid) {
      this.eventService.publishWish({
        content: this.messageForm.value.content,
      });
    } else {
      console.log('invalid');
    }
  }

  public loadData(event) {
    console.log(event);
    this.eventService.initWishes(this.eventService.nextMessagesPage, event);
  }

  async ngOnInit() {
    this.eventService.initWishes(1);
    this.username = (await this.userService.getUser()).username;
  }

}
