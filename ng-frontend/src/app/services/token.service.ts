import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  tokenSubject = new BehaviorSubject<string>('');
  token = this.tokenSubject.asObservable();

  userRole = new BehaviorSubject<string>('');
  role = this.userRole.asObservable();

  updateToken(tokenValue: string) {
    this.tokenSubject.next(tokenValue);
    // console.log(tokenValue)
  }

  updateRole(roleValue: string) {
    this.userRole.next(roleValue);
    // console.log(roleValue)
  }
}
