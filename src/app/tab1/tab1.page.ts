import {Component} from '@angular/core';
import {PopoverController, AlertController, LoadingController, Platform} from '@ionic/angular';
import {TelemetryService} from '../services/telemetry.service';
import {Router} from '@angular/router';
import { HomeOptionsComponent, } from '../components/home-options/home-options.component'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private router: Router, public telemetry: TelemetryService, public popoverController: PopoverController, public alertController: AlertController, public loadingController: LoadingController,public platform:Platform) {}
  goTo(route) {
    this.router.navigateByUrl(`/${route}`);
  }
  ngOnInit() {
    this.platform.backButton.subscribeWithPriority(1,()=>{
      alert("back button pressed")
    });
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: HomeOptionsComponent,
      event: ev,
      translucent: true,
      mode: 'md',
    });
    return await popover.present();
  }

  // async AckAlarm(name, status, id, index) {
  //   const alert = await this.alertController.create({
  //     header: 'Acknowledge Alarm',
  //     subHeader: name,
  //     message: status + ' moisture level',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: blah => {
  //           console.log('Confirm Cancel: blah');
  //         },
  //       },
  //       {
  //         text: 'Okay',
  //         handler: async () => {
  //           let popMes = await this.alertController.create({message: 'error'});
  //           console.log('Confirm Okay', id, index);
  //           let loading = await this.presentLoading();
  //           await loading.present();
  //           this.telemetry.acknowledgeAlarm(id, index).subscribe(
  //             async data => {
  //               if (data['success']) {
  //                 this.telemetry.alarms = this.telemetry.alarms
  //                   .filter((e, i) => {
  //                     if (i == index) {
  //                       return false;
  //                     } else {
  //                       return true;
  //                     }
  //                   })
  //                   .map(data => {
  //                     return data;
  //                   });
  //                 this.telemetry.storage.set('alarms', this.telemetry.alarms);
  //                 loading.dismiss();
  //                 return true;
  //               } else {
  //                 loading.dismiss();
  //                 await popMes.present();
  //                 return false;
  //               }
  //             },
  //             async err => {
  //               loading.dismiss();
  //               await popMes.present();
  //               return false;
  //             }
  //           );
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'please wait',
    });
    return loading;
  }
}
