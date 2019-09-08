import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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
  public eventImg: string;
  public minDate = '2019';

  constructor(
    private camera: Camera,
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
      this.eventImg = 'assets/imgs/category-cover' + this.eventCategory + '.jpg';
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

  public openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.eventImg = 'data:image/jpeg;base64,' + imageData;
      console.log(this.eventImg);
     }, (err) => {
      // Handle error
     });
  }


}
