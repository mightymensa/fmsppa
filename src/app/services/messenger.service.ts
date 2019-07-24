import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { InfoService } from './info.service';
import { Storage } from '@ionic/storage';

interface serverData {
  data: {},
  success: boolean
}

@Injectable({
  providedIn: 'root'
})

export class MessengerService {
  serverUrl:string = "http://10.20.100.43:8001"
  username:string = "adleman@gmail.com"
  password:string="password"
  constructor( public http: HttpClient,public infoService:InfoService,public storage:Storage) { 
    this.loadConfig()
  }

  async loadConfig(){
    let chck = await this.infoService.checkLoggedIn();
    if(chck){
      this.serverUrl = await this.storage.get('serverUrl').then(val => { if (val) { return val;}else{return '10.20.100.146:3333'}})
      this.username = await this.storage.get("username").then(data=>{if(data)return data;else{return ""}})
      this.password = await this.storage.get("password").then(data=>{if(data)return data;else{return ""}})
      console.log("loaded params",this.serverUrl,this.username,this.password)
    }else{
      
    }
  }
  signIn(uname,pwd,url) { 
    var headers = new HttpHeaders({ "Content-Type": 'Application/json' });
    return this.http.post<serverData>( url + "/login/?",JSON.stringify({username:uname,password:pwd}), { headers: headers });
  }
  getData() {
    console.log("get data",this.serverUrl,this.username,this.password)
    var headers = new HttpHeaders({ "Content-Type": 'Application/json' });
    return this.http.post(this.serverUrl + '/request/', JSON.stringify({username: this.username,password:this.infoService.password}), {headers: headers})
  }
  acknowledgeAlarm(id,index){
    var headers = new HttpHeaders({'Content-Type': 'Application/json'});
    return this.http.post(this.serverUrl + '/alarm_ack/', JSON.stringify({username: this.username,password:this.infoService.password,ack:'True',alarmId:id}), {headers: headers})
  }
  getNotifications(){
    var headers = new HttpHeaders({'Content-Type': 'Application/json'});
    return this.http.post(this.serverUrl + '/alarms/', JSON.stringify({username: this.username,timestamp:this.infoService.lastNotificationTimestamp}), {headers: headers})
  }
}
