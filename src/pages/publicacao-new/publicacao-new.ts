import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams, Platform,  ActionSheetController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase'
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-publicacao-new',
  templateUrl: 'publicacao-new.html',
})
export class PublicacaoNewPage {
  observacao:any;
  foto = 'assets/sem-foto.png'
  user: any;
  constructor(public auth: AuthProvider, 
              public cam: Camera, 
              public loading: LoadingController,
               public plt: Platform, 
               public actionSheet: ActionSheetController, 
               public fire: FirebaseProvider, 
               public toast: ToastController, 
               public navCtrl: NavController, 
               public navParams: NavParams) {
    this.user = this.auth.getCurrentUser()
  }

  save(){
    if (this.observacao == undefined){
      let constToast = this.toast.create({
        message: 'Por favor, digite a observação',
        duration: 4000,
        position: 'bottom'
      });
      constToast.present()
    } else {
      var date = new Date();
      let data = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
 
      this.fire.setPost(this.observacao, 
                        this.foto, 
                        this.user.currentUser.displayName, 
                        data);
      let tst = this.toast.create({
        message: 'Publicação feita com sucesso!',
        duration: 3000,
        position: 'bottom'
      });
      tst.present()
      tst.onDidDismiss(() => {
        this.navCtrl.pop()
      })
    }
  }

  camera() {
    const varActionsheet = this.actionSheet.create({
      title: 'Opções de Foto',
      buttons: [
        {
          text: 'Câmera',
          icon: !this.plt.is('ios') ? 'camera' : null,
          handler: () => {
            this.buscarFoto('camera');
          }
        },
        {
          text: !this.plt.is('ios') ? 'Galeria' : 'Câmera Roll',
          icon: !this.plt.is('ios') ? 'image' : null,
          handler: () => {
            this.buscarFoto('galeria');
          }
        },
        {
          text: 'Cancelar',
          icon: !this.plt.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return varActionsheet.present();
  }

  buscarFoto(tipo){
    let loading = this.loading.create({ content: '' });
    loading.present();
   
      this.cam.getPicture(
        {
          quality: 25,
          allowEdit: true,
          sourceType: tipo == 'camera' ? this.cam.PictureSourceType.CAMERA : this.cam.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.cam.DestinationType.DATA_URL,
          encodingType: this.cam.EncodingType.JPEG,
          mediaType: this.cam.MediaType.PICTURE
        }
      ).then(
        (imageData) => {
          this.foto = 'data:image/jpeg;base64,'+imageData;

          loading.dismiss();
        }
      ).catch((error) => {
        console.log(error)
        loading.dismiss();

      });
  }

 

}
