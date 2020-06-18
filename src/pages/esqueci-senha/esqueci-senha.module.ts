import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EsqueciSenhaPage } from './esqueci-senha';

import { AuthProvider } from '../../providers/auth/auth';

@NgModule({
  declarations: [
    EsqueciSenhaPage,
  ],
  imports: [
    IonicPageModule.forChild(EsqueciSenhaPage),
  ],
  providers:[AuthProvider]
})
export class EsqueciSenhaPageModule {}
