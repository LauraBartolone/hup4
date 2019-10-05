import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { PleaseLoginModal } from '../modal/please-login/please-login';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Utils } from '../services/utils';
import { PhotoDetailModal } from '../modal/photo-detail/photo-detail';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private nextPage = 1;
  private eventCode: string;
  public queryParam = {
    event: '',
    page: 1
  };

  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  public pictures: any[] = [];

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.route.params.subscribe(params => {
      // tslint:disable-next-line:radix
      this.eventCode = params.code;
      this.getPictures();
    });
  }

  private getPictures(page = 1, event?) {
    this.queryParam.event = this.eventCode;
    this.queryParam.page = page;

    this.apiService.get(
      'photoes/',
      this.apiService.buildHeaders(),
      this.queryParam
    ).subscribe(respData => {
      if (!this.apiService.hasErrors(respData)) {
        if (page === 1) {
          this.pictures = [];
        }
        this.pictures.push(...respData.response.results);
        this.nextPage = respData.response.next;
        if (Utils.isDefined(event)) {
          event.target.complete();
          if (this.pictures.length === respData.response.count ) {
            event.target.disabled = true;
          }
        }
      }
    });
  }

  public goToWishList() {
    this.router.navigate(['/wish-list', this.eventCode]);
  }

  public loadData(event) {
    this.getPictures(this.nextPage, event);
  }

  ngOnInit() {
  }

  public async openDetailPhotoModal(index) {
    const myModal = await this.modalController.create({
      component: PhotoDetailModal,
      componentProps: { currentIndex: index, pictures: this.pictures, nextPage: this.nextPage },
    });
    return await myModal.present();
  }

  // private async openModal() {
  //   const myModal = await this.modalController.create({
  //     component: PleaseLoginModal,
  //     cssClass: 'small-modal'
  //   });
  //   return await myModal.present();
  // }

}
