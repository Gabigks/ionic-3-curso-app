import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from '../http-service/http-service';

@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpServiceProvider,
    public storage: Storage,
    ) {

  }

  login(credentials) {
    
    this.http.post("auth/login", credentials)
      .subscribe((data: any) => {
        this.storage.set('token', data.token);
      },
      error => {
        console.log(error);
      }
      );
  }

  userIsLogged() {
    this.storage.get('token')
      .then(val => {
        if(val) return val;
        else return false;
      });
  }

  logout() {
    this.storage.remove('token');
  }

}
