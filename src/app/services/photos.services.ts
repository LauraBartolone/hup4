import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Utils } from '../services/utils';
import { ToastController, LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  public tryUploadCount = 0;
  public successCountUploads = 0;

  public eventCode: string;
  public nextPage = 1;

  private count = 0;
  public queryParam = {
    event: '',
    page: 1
  };

  public pictures: any[];

  constructor(
    private sanitizer: DomSanitizer,
    private apiService: ApiService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  public getPictures(page = 1, event?, refreshE?) {
    if (Utils.isDefined(this.nextPage)) {
      this.queryParam.event = this.eventCode;
      this.queryParam.page = page;

      this.apiService.get(
        'photos/',
        this.apiService.buildHeaders(),
        this.queryParam
      ).subscribe(respData => {
        if (!this.apiService.hasErrors(respData)) {
          if (page === 1) {
            this.pictures = [];
          }
          this.pictures.push(...respData.response.results);
          this.nextPage = respData.response.next;
          this.count = respData.response.count;
          if (Utils.isDefined(refreshE)) {
            refreshE.target.complete();
          }
        }
      });
    }
    if (Utils.isDefined(event)) {
      event.target.complete();
      if (this.pictures.length === this.count ) {
        event.target.disabled = true;
      }
    }
  }


  public postImage(photoData, eventId) {
    const data = {
      image: photoData,
      event: eventId
    };
    this.apiService.post( 'photos/',
    this.apiService.buildHeaders(),
    data).subscribe((respData) => {
      if (!this.apiService.hasErrors(respData)) {
        this.successCountUploads++;
        if (this.tryUploadCount === this.successCountUploads) {
          this.successUpload(this.successCountUploads);
          this.reloadAll();
        }
      } else {
        // TODO: handle
      }
    });
  }

  async successUpload(photoNum) {
    const toast = await this.toastController.create({
      message: 'Sccusfully upload: ' + photoNum + 'photos',
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

  getProgressBar(percentaje): string {
    const html: string =  '<h6>Please wait. Completed: ' + Math.floor(percentaje) + ' %</h6>';
    // return this.sanitizer.bypassSecurityTrustHtml(html);
    return html;
   }

   async presentLoading() {
     // tslint:disable-next-line:prefer-const
     let loader = await this.loadingCtrl.create({
       spinner: 'dots',
       message: this.getProgressBar(0)
     });
     loader.present();

     const interval = setInterval(() => {
       loader.message = this.getProgressBar(((this.successCountUploads * 100) / this.tryUploadCount) || 1);
       if (this.successCountUploads === this.tryUploadCount) {
         loader.dismiss();
         this.successCountUploads = 0;
         clearInterval(interval);
       }
     }, 1000);
   }


  public reloadAll(e?) {
    this.nextPage = 1;
    if (Utils.isDefined(e)) {
      this.getPictures(1, undefined, e);
    } else {
      this.getPictures(1);
    }
  }

}
