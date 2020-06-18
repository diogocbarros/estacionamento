import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicacaoNewPage } from './publicacao-new';
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth/auth';

@NgModule({
  declarations: [
    PublicacaoNewPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicacaoNewPage),
  ],
  providers:[Camera, AuthProvider]
})
export class PublicacaoNewPageModule {}
