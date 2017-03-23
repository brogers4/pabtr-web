import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  loggedIn: Observable<Boolean>;
  private _loggedIn: BehaviorSubject<Boolean>;
  private dataStore: {
    loggedIn: Boolean
  };

  constructor(private af: AngularFire){
    this.dataStore = { loggedIn: false };
    this._loggedIn = <BehaviorSubject<Boolean>>new BehaviorSubject(false);
    this.loggedIn = this._loggedIn.asObservable();

    this.af.auth.subscribe(auth => {
      if(auth !== null){
        this.dataStore.loggedIn = true;
      } else {
        this.dataStore.loggedIn = false;
      }
      this._loggedIn.next(Object.assign({},this.dataStore).loggedIn);
    })
  }
}
