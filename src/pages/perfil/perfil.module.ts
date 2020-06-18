import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPage } from './perfil';

import { AuthProvider } from '../../providers/auth/auth';

@NgModule({
  declarations: [
    PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
  ],
  providers:[AuthProvider]
})
export class PerfilPageModule {}
