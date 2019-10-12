import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
// import { PleaseLoginModal } from '../modal/please-login/please-login';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

import { PhotoDetailModal } from '../modal/photo-detail/photo-detail';
import { PhotosService } from '../services/photos.services';
import { UserService } from '../services/user.service';
import { PleaseLoginModal } from '../modal/please-login/please-login';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private photosService: PhotosService,
  ) {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.photosService.eventCode = params.code;
      this.photosService.getPictures();
    });
  }

  public goToWishList() {
    this.router.navigate(['/wish-list', this.photosService.eventCode]);
  }

  public loadData(event) {
    this.photosService.getPictures(this.photosService.nextPage, event);
  }

  ngOnInit() {
  }

  public async openDetailPhotoModal(index) {
    const myModal = await this.modalController.create({
      component: PhotoDetailModal,
      componentProps: { currentIndex: index },
    });
    return await myModal.present();
  }

}
