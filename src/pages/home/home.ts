import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, LoadingController } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase'
import lodash from 'lodash'
import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts = [];
  allPosts:any;
  user:any;
  constructor(public modal: ModalController, public auth: AuthProvider, public geolocation: Geolocation, public loading: LoadingController, public toast: ToastController, public navCtrl: NavController, public fire: FirebaseProvider) {
    this.user = this.auth.getCurrentUser();
    console.log(this.user)
  }

  ionViewWillEnter(){
    this.geolocation.getCurrentPosition().then(result => {
      this.fire.setLocalizacao(this.user.currentUser.uid, 
                               result.coords.latitude, 
                               result.coords.longitude);
    });
    this.getPosts();
  }

  getPosts(){
    let loading = this.loading.create({content: 'Carregando'});
    loading.present();   
    this.posts = []
    this.fire.getPosts().then((dados) => {
      this.allPosts = dados;
      this.allPosts = lodash.orderBy(this.allPosts, ['data'], ['desc']);

      for (const key of Object.keys(this.allPosts)) {
        this.posts.push({ data: this.allPosts[key].data,
                          observacao:this.allPosts[key].observacao,
                          usuario:this.allPosts[key].usuario,
                          foto:this.allPosts[key].foto,                    
                        });
      }
      loading.dismiss();    
    })  
  } 
  

  openPublicacao(){
    this.navCtrl.push('PublicacaoNewPage')
  }

  openImagem(imagem){
    let profileModal = this.modal.create('ImagemPage', 
                                        {varImagem: imagem}, 
                                        { cssClass: 'inset-modal-imagem', 
                                        enableBackdropDismiss: false });
    profileModal.present();
  }

}
