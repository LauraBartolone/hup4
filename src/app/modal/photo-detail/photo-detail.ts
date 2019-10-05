import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { runInThisContext } from 'vm';

@Component({
  selector: 'modal-photo-detail',
  templateUrl: './photo-detail.html',
  styleUrls: ['./photo-detail.scss'],
})
// tslint:disable-next-line:component-class-suffix
export class PhotoDetailModal {

  public imgSrc: string;
  public pictures: string;
  public currentIndex: number;
  public slideOpts = undefined;

  public show = false;

  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
    ) {
      this.currentIndex = navParams.get('currentIndex');
      this.pictures = navParams.get('pictures');
      this.slideOpts = {
        initialSlide: this.currentIndex,
        speed: 100
      };
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }

  public init() {
    this.show = true;
  }

}
