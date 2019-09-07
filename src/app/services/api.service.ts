import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string = environment.API_URL;
  token: any;

  constructor(
    private http: HttpClient,
  ) { }

  public buildHeaders(token?: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (Utils.isDefined(token)) {
      headers = this.appendAuthorization(headers, token);
    }
    const httpOptions = {
      headers
    };
    return httpOptions;
  }

  public post(url: string, httpOptions, postData?) {
    this.http.post(this.apiUrl + url, postData, httpOptions)
      .subscribe(data => {
        // tslint:disable-next-line:no-string-literal
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }

  private appendAuthorization(headers, token) {
    // tslint:disable-next-line:object-literal-key-quotes
    headers.append('Authorization', 'Bearer' + token);
    return headers;
  }


}
