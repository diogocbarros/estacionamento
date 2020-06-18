import { Component } from '@angular/core';
import { IonicPage, App, NavController, AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseProvider } from '../../providers/firebase/firebase'

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  user:any;
  profile: any;
  foto: any;
  nome: any;
  email: any;

  constructor(public fire: FirebaseProvider, public app: App, 
              public auth: AuthProvider, 
              public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.auth.getCurrentUser(); 
    this.fire.getProfile(this.user.currentUser.uid).then((profile) => {
      this.profile = profile;
      this.foto = this.profile.socialPhotoURL;
      this.nome = this.profile.nome;
      this.email = this.profile.email;

    })
  }

  goToExit(){
    let alert = this.alertCtrl.create({
      title: 'Tem certeza?',
      message: 'Você irá sair para a tela inicial do Aplicativo e terá que fazer login novamente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sair',
          handler: () => {
            this.auth.logoutUser().then(() => {
              this.app.getRootNav().setRoot('SigninPage');
            }, (error) => {});          }
        }
      ]
    });
    alert.present();

 
  }

}
