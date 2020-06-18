import { Component } from '@angular/core';
import { IonicPage, NavController, Platform , NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { FirebaseProvider } from '../../providers/firebase/firebase'

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  map: any;
  markers:any;
  usuarios:any;
 /* estabelecimentos = [
    {
      nome: 'Estabelecimento1',
      endereco: 'Endereço1',
      latitude: -15.5837031,
      longitude: -56.084949
    },
    {
      nome: 'Estabelecimento2',
      endereco: 'Endereço2',
      latitude: -15.574358,
      longitude: -56.0880802
    }];
*/
  constructor(public fire: FirebaseProvider, public geolocation: Geolocation, public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.initPage();
    });
  }

  initPage() {
    this.geolocation.getCurrentPosition().then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude);
    });
  }

  loadMap(lat, lng) {
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: false,
    };

    let element = document.getElementById('map');

    this.map = new google.maps.Map(element, mapOptions);

    let marker = new google.maps.Marker({
      position: latLng,
      title: 'Minha Localização',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    })


    let content = `
    <div id="myid"  class="item item-thumbnail-left item-text-wrap">
      <ion-item>
        <ion-row>
          <h6>`+marker.title+`</h6>
        </ion-row>
      </ion-item>
    </div>
    `;

    this.addInfoWindow(marker, content);
    marker.setMap(this.map);


    this.loadPoints();
  }

  loadPoints() {
    this.markers = [];
    this.fire.getUsuarios().then((users) => {
      this.usuarios = users;
      console.table(this.usuarios)
      for (const key of Object.keys(this.usuarios)) {
        let latLng = new google.maps.LatLng(this.usuarios[key].latitude, 
                                            this.usuarios[key].longitude);
  
        let marker = new google.maps.Marker({
          position: latLng,
          title: this.usuarios[key].nome
        })
  
        let content = `
        <div id="myid"  class="item item-thumbnail-left item-text-wrap">
          <ion-item>
            <ion-row>
              <h6>`+this.usuarios[key].nome+`</h6>
            </ion-row>
          </ion-item>
        </div>
        `
        ;
        this.addInfoWindow(marker, content);
        marker.setMap(this.map);
      }
    })
    

    return this.markers;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);

    })
  }


}
