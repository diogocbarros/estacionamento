import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import * as firebase from "firebase";

@Injectable()
export class FirebaseProvider {

  baseURL = 'https://estacionamento-tds.firebaseio.com/';

  constructor(public http: Http, public jsonp: Jsonp) {
  }

  setPost(observacao, foto, nome, data) {
    firebase.database().ref('Posts').push({
      observacao: observacao,
      usuario: nome,
      foto: foto,
      data: data
    });
  }

  setLocalizacao(uid, lat, lng) {
    firebase.database().ref('userProfile').child(uid).update({
      latitude: lat,
      longitude: lng
    })
  }

  public getPosts() {
    return new Promise(resolve => {
      this.http.get(`${this.baseURL}/Posts.json`)
        .subscribe(res => resolve(res.json()));
    });
  }

  public getProfile(uid) {
    return new Promise(resolve => {
      this.http.get(`${this.baseURL}/userProfile/${uid}.json`)
        .subscribe(res => resolve(res.json()));
    });
  }

  public getUsuarios() {
    return new Promise(resolve => {
      this.http.get(`${this.baseURL}/userProfile.json`)
        .subscribe(res => resolve(res.json()));
    });
  }

}
