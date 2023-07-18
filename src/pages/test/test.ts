import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  public beer: any = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController,
    public http: HttpClient
    ) {
      let url = this.navParams.get('api_url'); 
      let beer_id = this.navParams.get('beer_id'); 

      this.http.get(url + '/beers/' + beer_id)
               .map(res => JSON.stringify(res))
               .subscribe(data => {
                  this.beer = JSON.parse(data);
              });

  }

}
