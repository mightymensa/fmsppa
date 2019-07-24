import { Injectable, OnInit } from '@angular/core';
import { MessengerService } from './messenger.service';
import { Storage } from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { InfoService } from './info.service';
@Injectable({
  providedIn: 'root'
})
export class TelemetryService {
  public ready = true;
  public lastUpdate = '';
  public serverUrl = '';
  public username = 'FARM_OO1';
  public password = 'root';
  public farmTemp = '';
  public farmName =  '';
  public zones = [];
  public lastNotificationTimestamp = '';
  public alarms = []
  public config: any = {
    farmName: 'MIGGHHH',
    zones: [
      {
        zoneName: 'Zone A',
        devices: [
          {
            name: 'Sensor B',
            parameter: 'humidiy',
            unit: 'g/m3',
          },
        ],
      },
    ],
  };
  constructor(public messenger:MessengerService,public storage:Storage,public infoService:InfoService) {
    this.loadConfig()
   }
async loadConfig(){
  let chck = await this.infoService.checkLoggedIn();
  if(chck){
    this.farmName = await this.storage.get("farmName").then(data=>{if(data)return data;else{return "farm name"}})
    this.zones = await this.storage.get("zones").then(data=>{if(data)return data;else{return []}})
    this.username = await this.storage.get("username").then(data=>{if(data)return data;else{return ""}})
    this.password = await this.storage.get("password").then(data=>{if(data)return data;else{return ""}})
    this.getData();
  }else{

  }
}
  updateConfig(data){
    console.log("UPDATING MY",this.farmName,data['data']['farmName'],data['data']['zones'],data)
    this.farmName = data['data']['farmName'];
    console.log("UPDATING MY",this.farmName,data['data']['farmName'],data['zones'])
    this.config.zones = data['zones']
  }
  getData() {
    var headers = new HttpHeaders({'Content-Type': 'Application/json'});
    setInterval(() => {
      console.log("getting data")
      this.messenger.getData().subscribe(
        async data => {
          if (data['success']) {
            this.farmTemp = data['temperature'];
            this.storage.set('farmTemp',this.farmTemp)
            this.lastUpdate = new Date().toLocaleString();
            for (let dev of data['data']) {
              for (let zone of this.zones) {
                if (zone.zoneName == dev['zone']) {
                  for (let zoneDev of zone.devices) {
                    if (zoneDev.name == dev['device_name']) {
                      zoneDev.value = dev['value'];
                      zoneDev.status = dev['status'];
                      zoneDev.setpoint = dev['setpoint'];
                      zoneDev.timestamp = this.lastUpdate;
                    }
                  }
                }
              }
            }
            var savedData = await this.storage.set('zones', this.zones);
            var lastUpdateTime = await this.storage.set('lastUpdate', this.lastUpdate);
          }
        },
        err => {
          // alert("error "+JSON.stringify(err));
          console.log(err);
        }
      );
    }, 4000);
  }
}
