import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataPassService {
  // Authentication subject/observable that can be changed if the user is logged in
  authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticatedObservable = this.authenticatedSubject.asObservable();

  constructor() { }

  // Set the authentication to something new (e.g. user logs in or logs out)
  setAuthentication(newAuth: boolean) {
    this.authenticatedSubject.next(newAuth);
  }

}
