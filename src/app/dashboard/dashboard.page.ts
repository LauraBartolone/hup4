import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PleaseLoginModal } from '../modal/please-login/please-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  public pictures: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private modalController: ModalController) { }

  public loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
      const newEl = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      this.pictures.push(...newEl);
    }, 6777700);
  }

  ngOnInit() {
  }

  private async openModal() {
    const myModal = await this.modalController.create({
      component: PleaseLoginModal,
      cssClass: 'small-modal'
    });
    return await myModal.present();
  }

}
