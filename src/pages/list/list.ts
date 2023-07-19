import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

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
    public http: HttpServiceProvider,
    public camera: Camera,
    public toastCtrl: ToastController
    ) {

  }

  saveBeer(beer): void{
    this.http.post('beers', beer)
      .subscribe(() => {
        let toast = this.toastCtrl.create({
          message: 'Cerveja adicionada com sucesso',
          duration: 3000
        });
        toast.present();
      });
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
