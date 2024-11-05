import { Component, Inject } from '@angular/core';
import { DataPassService } from '../../../services/data-pass.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private dataPass: DataPassService, 
              @Inject(DOCUMENT) public document: Document, 
              public auth: AuthService,
              private tokenService: TokenService) {
    this.dataPass.authenticatedObservable.subscribe(data => {
      this.isAuthenticated = data;
    });
  }

  // AUTH LOGIC TO BE IMPLEMENTED
  login() {
    this.dataPass.setAuthentication(true);
    console.log("testing in progress")
  }
  
  logout() {
    this.dataPass.setAuthentication(false);
  }


  sub = '';
  getToken() {
    this.auth.user$.subscribe(data => {
      // console.log(data?.sub);
      this.sub = data?.sub ?? '';
      // console.log(this.sub);
      this.tokenService.updateToken(data?.sub ?? '');

    })
          }

}
