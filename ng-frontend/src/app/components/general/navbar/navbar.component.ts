import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { TokenService } from '../../../services/token.service';
import { BackendService } from '../../../services/backend.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAuthenticated = false;
  client: any;

  constructor(@Inject(DOCUMENT) public document: Document, 
              public auth: AuthService,
              private tokenService: TokenService,
              private backendService: BackendService) {
    this.auth.isAuthenticated$.subscribe(data => {
      this.isAuthenticated = data;
    });
  }

  sub = '';
  user = 'user';
  userRole = 'guest'
  
  userData: any;
  async getToken() {
    this.auth.user$.subscribe(data => {
      // console.log(data?.sub);
      this.sub = data?.sub ?? '';
      // console.log(this.sub);
      this.tokenService.updateToken(data?.sub ?? '');

    })

    this.getUserData();
    
  }



  async getUserData() {
    try {
      let response = await this.backendService.get(this.user);
      this.userData = await response.json();
      console.log('User Data:', this.userData);
      this.checkUserData();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  checkUserData() {
    // Loop through userData and check each entry against the sub value
    const matchingData = this.userData.find((item: any) => item.username === this.sub);

    if (matchingData) {
      console.log('Matching user found:', matchingData);
      this.userRole = matchingData.role;
      console.log(this.userRole);
      // Perform any additional actions needed for a matching user
    } else {
      console.log('No matching user found.');
      console.log(this.userRole)
    }
  }
}
