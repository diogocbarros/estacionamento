import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-imagem',
  templateUrl: 'imagem.html',
})
export class ImagemPage {
  imagem;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imagem = this.navParams.get('varImagem')
  }

  dismiss(){
    this.navCtrl.pop();
  }

}
