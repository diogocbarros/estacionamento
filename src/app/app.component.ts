import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../pages/tabs/tabs'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'SigninPage';


  constructor(public loading: LoadingController,
    public af: AngularFireAuth,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.getInitialPageToLoad().then((page) => {
          this.rootPage = page;
        });
      });

  }

  getInitialPageToLoad() {
    let loading = this.loading.create({
      content: 'Buscando Login...'
    });
    loading.present();
    return new Promise((resolve, reject) => {
      console.log(this.af.authState.take(1))
      this.af.authState.take(1).subscribe(dados => {
        console.log(dados)
        if (dados && dados.email && dados.uid) {
          loading.dismiss();
          resolve(TabsPage);
        } else {
          loading.dismiss();
        }
      });
    });
  }
}
