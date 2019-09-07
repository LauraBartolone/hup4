import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public apiService: ApiService) {
  }

  public registration(data) {
    this.apiService.post('rest-auth/registration/',
      this.apiService.buildHeaders(),
      data
    );
  }

  public login(data) {
    this.apiService.post('rest-auth/login/',
      this.apiService.buildHeaders(),
      data
  );
  }

  public logout() {
    this.apiService.post('rest-auth/logout/',
      this.apiService.buildHeaders(this.getToken())
  );
  }

  private getToken() {
    return 'mio token';
  }

}
