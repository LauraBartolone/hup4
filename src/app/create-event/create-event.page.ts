import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventSettingsModalPage } from '../modal/event-settings-modal/settings-modal.page';

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
    private route: ActivatedRoute,
    public modalController: ModalController
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

  public async openModalSettings() {
    const modal = await this.modalController.create({
      component: EventSettingsModalPage
    });
    return await modal.present();
    // const modal: Modal = this.modalController.create(EventSettingsModal);
    //   modal.present();
  }

}
