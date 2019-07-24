import { Injectable, OnInit } from '@angular/core';
import { AlertController, Platform, LoadingController } from '@ionic/angular';
import { MessengerService } from './messenger.service';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService implements OnInit {
  serverUrl:string = "http://10.20.100.43:8001"
  username:string = "mawuena"
  password:string="password"
  lastNotificationTimestamp:string = ""
  constructor(private alertCtrl: AlertController, public platform: Platform, public loadingController: LoadingController,public http: HttpClient, public storage: Storage) {
    // this.setup();
  }
  async ngOnInit(){
    let chck = await this.checkLoggedIn();
    
  }
  async presentLoading(msg: string) {
    const loading = await this.loadingController.create({
      message: msg
    });
    return loading;
  }
  async checkLoggedIn(){
    let loggedIn = await this.storage.get("signedIn").then(data=>{
      if(data==true){
        return true
      }
      else{return false}
    })
    return loggedIn;
  
  }
  async setLoggedIn(){
    await this.storage.set('signedIn',true).then(()=>{})
  }
  async simpleAlert(msg: string, header: string = "", bp: string = "") {
    var alert = await this.alertCtrl.create({
      header: "Prompt!",
      message: msg,
      mode: 'ios',
      buttons: [{ text: 'OK', cssClass: "alertButton" }],
      cssClass: 'simpleAlert'
    });
    if (header != "") {
      alert.header = header;
    }

    await alert.present();
  }  
}
