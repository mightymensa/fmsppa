import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InfoService } from 'src/app/services/info.service';
import { TelemetryService } from 'src/app/services/telemetry.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  displayLogin=false;
  userEmail = "adleman@gmail.com"
  userPassword = "password"
  serverUrl = "http://019e7c81.ngrok.io"
  constructor(public loadingController:LoadingController,public infoService:InfoService,public telemetry:TelemetryService,public messenger:MessengerService,public router: Router,public DBservice: DatabaseService) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    await loading.present();
    setTimeout(async () => {
      let checked = await this.infoService.checkLoggedIn();
      if (checked==true) {
        loading.dismiss();
        // this.loadData();
      } else {
        loading.dismiss();
        this.displayLogin = true;
      }
    }, 1000);
  }
  async signIn() {
    let signingin = await this.loadingController.create({
      message: 'Verifying...',
    });
    await signingin.present();
    let loadingData = await this.loadingController.create({
      message: 'Loading your data. PLease wait...',
    });
    this.messenger.signIn(this.userEmail,this.userPassword,this.serverUrl).subscribe(
      async data=>{
        signingin.dismiss();
        if(data['success']){
          this.displayLogin = false;
          await loadingData.present();
          this.telemetry.farmName = data['data']['FarmName'];
          this.telemetry.zones = data['data']['zones'];
          this.DBservice.saveValues([
            {"name":"farmName","value":data['data']['FarmName']},
            {"name":"zones","value":data['data']['zones']},
            {"name":"username","value":this.userEmail},
            {"name":"password","value":this.userPassword},
            {"name":"serverUrl","value":this.serverUrl}
        ])
        this.infoService.simpleAlert("","data loaded");//45.32.81.97:2019
        this.infoService.setLoggedIn();
        this.telemetry.getData();
        this.messenger.serverUrl = this.serverUrl;
        this.messenger.username = this.userEmail;
        this.messenger.password = this.userPassword;
        loadingData.dismiss();
          this.router.navigate(['/home']);
        }else{
          this.infoService.simpleAlert("","please check connection");
        }
      },
      err=>{
        signingin.dismiss();
        alert(JSON.stringify(err));
        this.infoService.simpleAlert("","please check connection");
      }
    )
  }
}
