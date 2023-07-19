import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpServiceProvider {

  private url = "http://192.168.129.12:3030/v1";

  constructor(public http: HttpClient) {
    console.log('Hello HttpServiceProvider Provider');
  }

  getAll(endpoint) {
    return this.http.get(`${this.url}/${endpoint}`)
        .map(res => { return res; });
  }

  get(endpoint, id) {
    return this.http.get(`${this.url}/${endpoint}/${id}`)
      .map(res => { return res; });
  }

  post(endpoint, resource) {
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    return this.http.post(`${this.url}/${endpoint}`, resource, options)
      .map(res => { return res; });
  }

}
