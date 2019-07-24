import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, UrlSegment} from '@angular/router';
import {Storage} from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(public storage:Storage,public router:Router){}
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // return true;
      // console.log('home guard called');
  return this.storage.get('signedIn').then(val => {
    if (val == true) {
      return true;
    } else {
      this.router.navigateByUrl('landing');
      return false;
    }
  });
}
}
