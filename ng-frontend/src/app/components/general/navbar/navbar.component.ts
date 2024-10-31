import { Component } from '@angular/core';
import { DataPassService } from '../../../services/data-pass.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAuthenticated = false;

  constructor(private dataPass: DataPassService) {
    this.dataPass.authenticatedObservable.subscribe(data => {
      this.isAuthenticated = data;
    });
  }

  // AUTH LOGIC TO BE IMPLEMENTED
  login() {
    this.dataPass.setAuthentication(true);
  }
  
  logout() {
    this.dataPass.setAuthentication(false);
  }

}
