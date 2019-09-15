import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public events: any[];
  constructor(
    private apiService: ApiService,
    private userService: UserService,
  ) { }

  public async getEventList() {
    const token = await this.userService.getToken();
    return this.apiService.get('events/', this.apiService.buildHeaders(token));
  }

  public async getEvent(eventId) {
    const token = await this.userService.getToken();
    return this.apiService.get('events/' + eventId + '/', this.apiService.buildHeaders(token));

  }
  // public async getEventList() {
  //   const token = await this.userService.getToken();
  //   return this.apiService.get('events/', this.apiService.buildHeaders(token));

  // }
}
