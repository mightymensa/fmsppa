import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  username = "";
  password = "";
  serverUrl = "";
  farmName = "";
  constructor(public infoService:InfoService,public storage:Storage) { }

  async ngOnInit() {
    let chck = await this.infoService.checkLoggedIn();
    if(chck){
      this.farmName = await this.storage.get('farmName').then(val => { if (val) { return val;}else{return ''}})
      this.serverUrl = await this.storage.get('serverUrl').then(val => { if (val) { return val;}else{return ''}})
      this.username = await this.storage.get("username").then(data=>{if(data)return data;else{return ""}})
      this.password = await this.storage.get("password").then(data=>{if(data)return data;else{return ""}})
      console.log("loaded params",this.serverUrl,this.username,this.password)
    }else{
      
    }
  }

}
