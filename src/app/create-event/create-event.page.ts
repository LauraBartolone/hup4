import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  public createEventForm: FormGroup;
  public eventCategory: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) {
    this.createEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      date: ['', Validators.required],
    });
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.eventCategory = parseInt(params.eventCategory) + 1;
    });
  }

  ngOnInit() {
  }

  public onSubmit(ev: any): void {
    console.log(ev, this.createEventForm.value);
  }

  public openModalSettings() {
    // const modal: Modal = this.modalController.create(EventSettingsModal);
    //   modal.present();
  }

}
