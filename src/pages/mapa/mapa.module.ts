import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseProvider } from '../../providers/firebase/firebase'

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
  ],
  providers: [Geolocation, FirebaseProvider]
})
export class MapaPageModule {}
