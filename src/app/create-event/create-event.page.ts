import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EventSettingsModalPage } from '../modal/event-settings-modal/settings-modal.page';
import * as moment from 'moment';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  momentjs: any = moment;
  public createEventForm: FormGroup;
  public eventCategory: number;
  public eventImg: string;
  public minDate = this.momentjs(new Date()).format('YYYY-MM-DD');

  public requestData;

  constructor(
    private camera: Camera,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public modalController: ModalController,
    public apiService: ApiService,
    ) {
    console.log(this.minDate);
    this.createEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      note: ['', Validators.required],
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
    this.requestData = {
      date: this.momentjs(new Date(this.createEventForm.value.date)).format('YYYY-MM-DD'),
      note: this.createEventForm.value.note,
      category: this.eventCategory,
      name: this.createEventForm.value.name
    };

    this.apiService.post('events/',
      this.apiService.buildHeaders(),
      this.requestData
    ).subscribe((resp) => {

      console.log(resp);
    });

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
      this.eventImg = 'data:image/jpeg;base64,' + imageData;
      // tslint:disable-next-line:no-string-literal
      this.requestData['image'] = this.eventImg;
      console.log(this.eventImg);
     }, (err) => {
      // Handle error
     });
  }


}
