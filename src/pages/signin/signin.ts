import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from "@angular/forms";
import { TabsPage } from '../tabs/tabs';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  public loginForm: any;

  constructor(public modal: ModalController, public toast: ToastController, public loading: LoadingController, public auth: AuthProvider, public formBuilder: FormBuilder, public navCtrl: NavController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required]
      )]
    });
  }

  esqueciSenha() {
    let profileModal = this.modal.create('EsqueciSenhaPage', {}, { cssClass: 'inset-modal', enableBackdropDismiss: false });
    profileModal.present();
  }


  login() {

    let loading = this.loading.create({
      content: 'Realizando login...'
    });
    loading.present();
    let { email, password } = this.loginForm.value;
    this.auth.loginUser(email, password).then(() => {
      loading.dismiss();
      this.navCtrl.setRoot(TabsPage)
    }, (error) => {
      let toast = this.toast.create({
        message: 'Acesso não encontrado, por favor verifique seu e-mail e senha',
        duration: 3000,
        position: 'bottom'
      })
      toast.present()
      loading.dismiss();
    });

  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  facebookLogin() {
    let loading = this.loading.create({
      content: 'Realizando login com Facebook...'
    });
    loading.present();
    this.auth.facebookLogin().then(() => {

      loading.dismiss();
      this.navCtrl.setRoot(TabsPage)

    }, error => {
      console.log(error)

      loading.dismiss();
    });
  }


}
