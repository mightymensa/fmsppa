import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from "@ionic/storage";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { HomeOptionsComponent } from './components/home-options/home-options.component';
import { InfoService } from './services/info.service';
import { TelemetryService } from './services/telemetry.service';
import { AccountPipe } from './pages/account.pipe';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
import { DetailPage } from './pages/detail/detail.page';
@NgModule({
  declarations: [AppComponent,HomeOptionsComponent, AccountPipe,DetailPage],
  entryComponents: [HomeOptionsComponent,DetailPage],
  imports: [FormsModule,HttpClientModule,IonicStorageModule.forRoot(),BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    ScreenOrientation,
    GoogleMaps,
    StatusBar,
    SplashScreen,
    InfoService,
    TelemetryService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
