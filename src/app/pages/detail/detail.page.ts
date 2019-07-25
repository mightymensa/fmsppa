import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(public modalCtrl:ModalController, public navParams: NavParams) { 
    // console.log(navParams.get('firstName'))
this.deviceName = navParams.get('deviceName')
this.setpoint = navParams.get('setpoint')
  }
  setpoint = ""
  deviceName = ""
  ngOnInit() {
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  loadChart(){

  }
}
