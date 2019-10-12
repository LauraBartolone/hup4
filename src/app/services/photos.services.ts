import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Utils } from '../services/utils';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  public eventCode: string;
  public nextPage = 1;
  private count = 0;
  public queryParam = {
    event: '',
    page: 1
  };

  public pictures: any[];

  constructor(
    private apiService: ApiService,
  ) { }

  public getPictures(page = 1, event?) {
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

}
