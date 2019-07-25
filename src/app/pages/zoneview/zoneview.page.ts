import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TelemetryService} from 'src/app/services/telemetry.service';
import {PopoverController, ModalController} from '@ionic/angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, Environment} from '@ionic-native/google-maps';
import {DetailPage} from '../detail/detail.page';
@Component({
  selector: 'app-zoneview',
  templateUrl: './zoneview.page.html',
  styleUrls: ['./zoneview.page.scss'],
})
export class ZoneviewPage implements OnInit {
  zoneIndex: any = 0;
  segmentTest = 'map';
  map: GoogleMap;
  gridView: boolean = true;
  testMarkers = [{lat: 5.629712, long: -0.089065}, {lat: 5.631004, long: -0.089333}, {lat: 5.631218, long: -0.089129}];
  plottedMarkers: Marker[] = [];
  constructor(public telemetry: TelemetryService, private activatedRoute: ActivatedRoute, public popoverController: PopoverController, public modCtrl: ModalController) {}
  markersToPlot = [];
  ngOnInit() {
    this.zoneIndex = this.activatedRoute.snapshot.paramMap.get('index');
    this,this.markersToPlot = this.telemetry.zones[this.zoneIndex].devices.map(e=>{return e})
  }
  ionViewDidEnter() {
    try {
    } catch (error) {
      alert(JSON.stringify(error));
    }
    console.log(this.telemetry.zones)
  }
  async showDetails(zone, ind) {
    console.log('show deyuiu', zone);
    let modal = await this.modCtrl.create({
      component: DetailPage,
      componentProps: {
        deviceName: zone.name,
        setpoint: zone.setpoint,
        deviceIndex: ind,
      },
    });
    return await modal.present();
  }
  segmentChanged(e) {
    let view = e.detail.value;

    if (view == 'map') {
      this.gridView = false;
      this.loadMap();
    } else {
      this.gridView = true;
    }
  }
  loadView(e) {
    alert(e);
  }
  setGrid(onOff) {
    if (onOff == '0') {
      this.gridView = false;
      this.loadMap();
    } else {
      this.gridView = true;
    }
  }
  loadMap() {
    // This code is necessary for browser
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: 'AIzaSyD79DIJ2enBYUdYwfvCRxiaSRCiKCbUn30',
      API_KEY_FOR_BROWSER_DEBUG: 'AIzaSyD79DIJ2enBYUdYwfvCRxiaSRCiKCbUn30',
    });

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.markersToPlot[0].latitude,
          lng: this.markersToPlot[0].longitude,
        },
        zoom: 18,
        tilt: 30,
      },
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // let marker: Marker;
    // marker = this.map.addMarkerSync({
    //   title: 'Ionic',
    //   icon: 'blue',
    //   animation: 'DROP',
    //   position: {
    //     lat: 5.631218,
    //     lng: -0.089529,
    //   },
    // });

    for (let i = 0; i < this.markersToPlot.length; i++) {
      this.plottedMarkers[i] = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: this.markersToPlot[i]['latitude'],
          lng: this.markersToPlot[i]['longitude'],
        },
      });
    }
 
  }
}
