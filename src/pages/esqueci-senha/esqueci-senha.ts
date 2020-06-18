import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-esqueci-senha',
  templateUrl: 'esqueci-senha.html',
})
export class EsqueciSenhaPage {
  email:any;
  constructor(public auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.email)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EsqueciSenhaPage');
  }

  enviar(){
    this.auth.resetPassword(this.email);
    this.navCtrl.pop()
  }

}
