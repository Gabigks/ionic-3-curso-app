import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { TestPage } from '../test/test';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private url = "http://192.168.129.12:3030/v1";
  public beers: Array<{}>;

  constructor(
    public navCtrl: NavController,
    public http: HttpClient
    ) {
      this.http.get(this.url + '/beers')
               .map(res => JSON.stringify(res))
               .subscribe(data => {
                  this.beers = JSON.parse(data)
              });
  }

  goToTestPage(): void{
    this.navCtrl.push(TestPage);
  }

  loadBeer(id: number): void{
    this.navCtrl.push(TestPage, {
      'beer_id': id,
      'api_url': this.url
    });
  }

}
