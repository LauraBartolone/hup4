import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from './utils';
import { Observable, Observer } from 'rxjs';
import { utils } from 'protractor';

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
    console.log('httpOp', httpOptions);
    return httpOptions;
  }

  public get(url: string, httpOptions): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.get(this.apiUrl + url, httpOptions)
        .subscribe(data => {
          // tslint:disable-next-line:no-string-literal
          observer.next(
            this.buildResponse(200, data)
          );
          observer.complete();
         }, error => {
          observer.next(
            this.buildResponse(error.status, undefined, error.error)
          );
          observer.complete();
        });
    });
  }

  public post(url: string, httpOptions, postData?): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.http.post(this.apiUrl + url, postData, httpOptions)
        .subscribe(data => {
          // tslint:disable-next-line:no-string-literal
          observer.next(
            this.buildResponse(200, data)
          );
          observer.complete();
         }, error => {
          observer.next(
            this.buildResponse(error.status, undefined, error.error)
          );
          observer.complete();
        });
    });
  }

  private appendAuthorization(headers, token) {
    // tslint:disable-next-line:object-literal-key-quotes
    headers = headers.append('Authorization', 'Token ' + token);
    return headers;
  }

  private buildResponse(code, data, error = []) {
    // tslint:disable-next-line:no-string-literal
    if (Utils.isDefined(error['non_field_errors'])) {
      // tslint:disable-next-line:no-string-literal
      error = error['non_field_errors'];
    }
    return {
      // tslint:disable-next-line:object-literal-shorthand
      code: code,
      response: data,
      errors: error
    };
  }

  public hasErrors(respData) {
    if (respData.errors.length === 0) {
      return false;
    }
    return true;
  }


}
