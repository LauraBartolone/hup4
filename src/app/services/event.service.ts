import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Utils } from './utils';
// import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public nextMessagesPage = 1;
  private count = 0;

  public events = [];
  public messages: any[];

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private storageService: StorageService,
    public toastController: ToastController,
    // private photoLibrary: PhotoLibrary
  ) { }

  public async getEventList() {
    const token = await this.userService.getToken();
    return this.apiService.get('events/', this.apiService.buildHeaders(token)).subscribe(resp => {
      this.events = resp.response;
    });
  }

  public async getEvent(eventId) {
    const token = await this.userService.getToken();
    return this.apiService.get('events/' + eventId + '/', this.apiService.buildHeaders(token));
  }

  private download(url) {
    // this.photoLibrary.requestAuthorization().then(() => {
    //   // tslint:disable-next-line:only-arrow-functions
    //   this.photoLibrary.saveImage(url, 'Hup').then(li => {
    //     console.log('salvata');
    //   });
    // })
    // .catch(err => console.log('permissions weren\'t granted'));
  }

  public downloadPhoto(eventId) {
    this.apiService.get('all-photos/?event=' + eventId, this.apiService.buildHeaders())
    .subscribe(resp => {
      console.log(resp.response);
      resp.response.forEach(photo => {
        this.download(photo.image);
      });
    });
  }

  public async initWishes(page = 1, event?) {
    if (Utils.isDefined(this.nextMessagesPage) || page === -1) {
      if (page === -1) {
        this.nextMessagesPage = 1;
      }
      console.log(this.nextMessagesPage);
      await this.storageService.get('event').then(async (data) => {
        // data = JSON.parse(data);
        const token = await this.userService.getToken();

        const queryParam = {
          board: data.board,
          page: this.nextMessagesPage,
        };
        return await this.apiService.get('board-messages/',
           this.apiService.buildHeaders(token),
           queryParam)
          .subscribe(respData => {
            console.log(respData);
            if (!this.apiService.hasErrors(respData)) {
              if (page === 1 || page === -1) {
                this.messages = [];
              }
              this.messages.push(...respData.response.results);
              this.count = respData.response.count;
              this.nextMessagesPage = respData.response.next;
            } else {
              // TODO: #ERROR
              console.log(respData);
            }
        });
      });
    }
    if (Utils.isDefined(event)) {
      event.target.complete();
      if (this.messages.length === this.count ) {
        event.target.disabled = true;
      }
    }
  }

  async successCreatedMessage() {
    const toast = await this.toastController.create({
      message: 'Success, Message sent!',
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

  async successDeletedEvent() {
    const toast = await this.toastController.create({
      message: 'Success, Event deleted!',
      duration: 2000,
      cssClass: 'toast-success'
    });
    toast.present();
  }

  public async deleteEvent(eventId) {
    const isLogged = await this.userService.isLoggedIn();
    if (isLogged) {
        const token = await this.userService.getToken();
        return this.apiService.delete('events/' + eventId + '/',
           this.apiService.buildHeaders(token))
          .subscribe(respData => {
            if (!this.apiService.hasErrors(respData)) {
              this.successDeletedEvent();
              this.getEventList();
            } else {
            // TODO: #ERROR
            console.log(respData);
            }
        });
    }
  }

  public async publishWish(body) {
    const isLogged = await this.userService.isLoggedIn();
    if (isLogged) {
      await this.storageService.get('event').then(async (data) => {
        // data = JSON.parse(data);
        // tslint:disable-next-line:no-string-literal
        body['board'] = data.board;
        const token = await this.userService.getToken();
        return this.apiService.post('board-messages/',
           this.apiService.buildHeaders(token), body)
          .subscribe(respData => {
            if (!this.apiService.hasErrors(respData)) {
              this.initWishes(-1);
              this.successCreatedMessage();
            } else {
            // TODO: #ERROR
            console.log(respData);
            }
        });
      });
    }
  }

}
