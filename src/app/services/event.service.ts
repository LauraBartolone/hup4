import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Utils } from './utils';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public nextMessagesPage = 1;
  private count = 0;

  public events: any[];
  public messages: any[];

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private storageService: StorageService,
    public toastController: ToastController
  ) { }

  public async getEventList() {
    const token = await this.userService.getToken();
    return this.apiService.get('events/', this.apiService.buildHeaders(token));
  }

  public async getEvent(eventId) {
    const token = await this.userService.getToken();
    return this.apiService.get('events/' + eventId + '/', this.apiService.buildHeaders(token));
  }

  public async initWishes(page = 1, event?) {
    if (Utils.isDefined(this.nextMessagesPage)) {
      await this.storageService.get('event').then(async (data) => {
        // data = JSON.parse(data);
        const token = await this.userService.getToken();
        const queryParam = {
          board: data.board,
          page: this.nextMessagesPage,
        };
        return this.apiService.get('board-messages/',
           this.apiService.buildHeaders(token),
           queryParam)
          .subscribe(respData => {
            if (!this.apiService.hasErrors(respData)) {
              if (page === 1) {
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
              this.initWishes();
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
