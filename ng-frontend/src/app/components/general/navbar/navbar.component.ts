import { Component, Inject } from '@angular/core';
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

  constructor(@Inject(DOCUMENT) public document: Document, 
              public auth: AuthService,
              private tokenService: TokenService) {
    this.auth.isAuthenticated$.subscribe(data => {
      this.isAuthenticated = data;
    });
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
