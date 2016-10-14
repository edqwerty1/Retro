import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class RoomStoreService {
columns: FirebaseListObservable<any>;
  constructor(private af: AngularFire) { 
      this.columns = af.database.list('/items');
  }
  
  getMessages(title){
      return this.af.database.list('/messages/' + title);
  }

}