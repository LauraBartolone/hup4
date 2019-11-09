import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PhotosService } from '../../services/photos.services';

@Component({
  selector: 'modal-photo-detail',
  templateUrl: './photo-detail.html',
  styleUrls: ['./photo-detail.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class PhotoDetailModal {

  public imgSrc: string;
  public currentIndex: number;
  public slideOpts = undefined;

  private swipeCount = 0;
  public showSwipe = true;

  public show = false;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public photosService: PhotosService,
    ) {
      this.currentIndex = navParams.get('currentIndex');
      this.slideOpts = {
        initialSlide: this.currentIndex,
        speed: 100
      };
  }

  public hideSwipe() {
    this.swipeCount++;
    if (this.swipeCount > 1) {
      this.showSwipe = false;
    }
  }
  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public next() {
    this.photosService.getPictures(this.photosService.nextPage);
  }

  public init() {
    this.show = true;
  }

}
