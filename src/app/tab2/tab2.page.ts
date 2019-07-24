import { Component } from '@angular/core';
import { TelemetryService } from '../services/telemetry.service';
import { Router } from '@angular/router';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public telemetry:TelemetryService,public router:Router,public infoService:InfoService) {}
  goTo(route) {
    this.router.navigateByUrl(`/${route}`);
  }
  async showZone(zone,index) {
    var loader = await this.infoService.presentLoading(
      `loading ${zone.zoneName}`
    );
    await loader.present();

    setTimeout(async () => {
      loader.dismiss();
      // this.router.navigateByUrl("/viewreports/1234");
      this.router.navigate(["zoneview",index]);
    }, 1000);
  }
}
