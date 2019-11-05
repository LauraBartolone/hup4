
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { PhotoDetailModal } from '../modal/photo-detail/photo-detail';
import { PhotosService } from '../services/photos.services';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UserService } from '../services/user.service';
import { StorageService } from '../services/storage.service';
// import { forkJoin } from 'rxjs';
import { EventService } from '../services/event.service';
import { MenuLink } from '../components/side-menu/side-menu.component';
import { MenuService } from '../services/menu.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private imageResponse = [];
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  public event: any;

  constructor(
    private menu: MenuService,
    private imagePicker: ImagePicker,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private photosService: PhotosService,
    public platform: Platform,
    private storageService: StorageService,
    private userService: UserService,
    public eventService: EventService,
    public apiService: ApiService,
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

  ionViewWillEnter() {
    const sideLinks: MenuLink[] = [
      {
        isProtected: false,
        title: 'Create event',
        linkHref: 'create-event-category',
      },
      {
        isProtected: true,
        title: 'My events',
        linkHref: 'profile-events-list',
      },
    ];
    this.menu.title.next('Dashboard');
    this.menu.details.next(sideLinks);
  }

  async initEvent() {
    // const eventId = await this.storageService.get('event').then(async (data) => {
    //   return data.eventId;
    // });
    // this.event = (await this.eventService.getEvent(eventId)).subscribe(respData => {
    //   if (!this.apiService.hasErrors(respData)) {
    //     this.event = respData.response;
    //     console.log(this.event);
    // } else {
    //   // TODO: #ERROR
    // }
    // });
  }

  ngOnInit() {
    this.initEvent();
  }

  public async openDetailPhotoModal(index) {
    const myModal = await this.modalController.create({
      component: PhotoDetailModal,
      componentProps: { currentIndex: index },
    });
    return await myModal.present();
  }

  public async loadPictures() {
    const options: any = {
      quality: 100,
      maximumImagesCount: 15,
      outputType: 1, // 1 BASE 64, 0 for FILEURI
    };
    this.imagePicker.getPictures(options).then((results) => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
      this.uploadPhotos();
    }, (err) => { alert(err); });
  }

  public async  uploadPhotos() {
    const eventId = await this.storageService.get('event').then(async (data) => {
      return data.eventId;
    });
    this.imageResponse.forEach(photo => {
      this.photosService.postImage(photo, eventId);
    });
  }

  public openGallery() {
    if (this.platform.is('android')) {
      this.imagePicker.hasReadPermission().then( resp => {
        if (resp) {
          this.loadPictures();
        } else {
          this.imagePicker.requestReadPermission().then( resp2 => {
            if (resp2) {
              this.loadPictures();
            }
          });
        }
      });
    } else {
      this.loadPictures();
    }
  }

}
