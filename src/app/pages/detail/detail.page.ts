import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  googleChartLibrary;
  constructor(public modalCtrl: ModalController, public navParams: NavParams) {

    this.deviceName = navParams.get('deviceName');
    this.setpoint = navParams.get('setpoint');
  }
  setpoint = '';
  deviceName = '';
  ngOnInit() {
  }
  dismiss() {
 
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  loadChart() {
    
  }

}
