import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public storage: Storage) { }
  saveValues(data){
    for(let obj of data){
      this.storage.set(obj.name,obj.value)
    }
  }
  async logout(){
    await this.storage.clear().then(e=>{return true},err=>{return false})
  }
}
