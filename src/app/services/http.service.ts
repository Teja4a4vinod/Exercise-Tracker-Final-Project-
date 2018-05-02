import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class HttpService {
  private url = 'http://localhost:8080';
  constructor(private httpClient: Http) {

  }
  getHeader() {
    const headers = new Headers();
    //headers.append('content-type', 'application/x-www-form-urlencoded');
    headers.append('content-type', 'application/json');
    return headers;
  }
  post(req: any): Observable<any> {
    const url = this.url + req.uri;
    const body = JSON.stringify(req.body);
    const requestOptions = new RequestOptions({
      headers: this.getHeader()
    });
    return this.httpClient.
      post(url, body, requestOptions)
      .map(res => {
        return res.json();
      });
  }

  get(req: any): Observable<any> {
    const url = this.url + req.uri;
    const requestOptions = new RequestOptions({
      headers: this.getHeader()
    });
    return this.httpClient.get(url, requestOptions)
      .map(res => {
        return res.json();
      });
  }
}
