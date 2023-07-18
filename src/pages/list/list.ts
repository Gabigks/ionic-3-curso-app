import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private url = "http://192.168.129.12:3030/v1";

  public beer = {
    name: "", 
    price: "", 
    type: "", 
    mark: "",
    img: ""
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: HttpClient,
    public camera: Camera
    ) {

  }

  saveBeer(beer): void{
    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    }
    
    this.http.post(this.url + '/beers', beer, options)
              .map(res => console.log(res)).subscribe();
  }

  getPhoto(): void{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.beer.img = base64Image;
    }, (err) => {
      console.log(err);
    });
  }
}
