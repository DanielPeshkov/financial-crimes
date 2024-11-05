import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  tokenSubject = new BehaviorSubject<string>('');
  token = this.tokenSubject.asObservable();

  updateToken(tokenValue: string) {
    this.tokenSubject.next(tokenValue);
    console.log(tokenValue)
  }
}
