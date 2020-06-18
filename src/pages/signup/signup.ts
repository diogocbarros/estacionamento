import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { IonicPage, NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

 import { AuthProvider } from '../../providers/auth/auth';

 @IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  public loginForm: any;

  constructor(public auth: AuthProvider, 
    public toast: ToastController, 
    public alert: AlertController,
    public loading: LoadingController, 
    public formBuilder: FormBuilder,
    public navCtrl: NavController) {


    this.loginForm = formBuilder.group({
      nome: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.required],
      passwordConfirmation: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
    });
  } 



 /* tabs(){
    this.navCtrl.push('TabsPage');
  }

  forgotPassword(){
    this.navCtrl.push('ForgotpasswordPage');
  }
*/

  signup(){

      let load = this.loading.create({
        content: 'Carregando'
      });
      load.present()
      let { nome, celular, email, password, passwordConfirmation } = this.loginForm.value;
      if (passwordConfirmation !== password) {
        let toast = this.toast.create({
          message: 'A senha e a confirmação de senha precisam ser iguais',
          duration: 3000,
          position: 'bottom'
        })
        toast.present()
        load.dismiss()
      } else {
         this.auth.signupUser(email, password, nome, celular).then(() => {
              const alert = this.alert.create({
                title: 'Eba!',
                subTitle: 'Usuário cadastrado com sucesso!',
                buttons: ['OK']
              });
              alert.present();
              load.dismiss();
              this.navCtrl.setRoot(TabsPage)     
          }, (error) =>{
              const alert = this.alert.create({
                title: 'Ops!',
                subTitle: 'Usuário não cadastrado, tente novamente!',
                buttons: ['OK']
              });
              console.log(error)

              alert.present();
              load.dismiss();

            }) 
      }
  }  
 

}
