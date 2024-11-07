import { LaunderingReport } from '../models/launderingreport';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Contact, createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { Address } from '../models/address';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-launderings',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './launderings.component.html',
  styleUrl: './launderings.component.scss'
})
export class LaunderingsComponent implements OnInit {
  reports: LaunderingReport[] = [];
  tableReports: LaunderingReport[] = [];
  currentRole: string = 'guest';
  isAuthenticated = false;

  constructor(private client: BackendService, 
              private router: Router,
              private tokenService: TokenService,
              public auth: AuthService) {
                this.auth.isAuthenticated$.subscribe(data => {
                  this.isAuthenticated = data;
            
                  if (this.isAuthenticated) {
                    this.getRole();
                  }
                });
              }
  
  
  async ngOnInit() {
    // this.getRole();
    let resp = await this.client.get('laundering/report').then(data => data.json())
    let tempReports: LaunderingReport[] = [];
    if (resp) {
      for (let report of resp) {
        let {
          id, amount, source, 
          method, processing, location, incidentDate, 
          approx, organized, documentation, description, 
          contactid, status, created, updated, contact, 
          launderingbusiness, launderingindividual
        } = report;
        if (incidentDate) {
          incidentDate = incidentDate.substring(0,10);
        }

        contact = createContact(contact)

        let business: Business[] = [];
        for (let b of launderingbusiness) {
          const newbus = createBusiness(b);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of launderingindividual) {
          const newind = createIndividual(i);
          individual.push(newind);
        }

        let other = new LaunderingReport(id, amount, source, 
          method, processing, location, incidentDate, 
          approx, organized, documentation, description, 
          contactid, status, created, updated,
          contact, business, individual
        )
        
          tempReports.push(other);
      }
    }
    this.reports = tempReports;
  }

  rowClick(report: LaunderingReport) {
    localStorage.setItem('launderingReport', JSON.stringify(report))
    this.router.navigate(['/laundering/report'])
  }

  getRole() {
    this.tokenService.role.subscribe(roleValue => {
      this.currentRole = roleValue;
      console.log('Current Role:', this.currentRole);
    });
  }
}

