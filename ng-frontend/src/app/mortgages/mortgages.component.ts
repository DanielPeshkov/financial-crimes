import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { MortgageReport } from '../models/mortgagereport';
import { AuthService } from '@auth0/auth0-angular';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-mortgages',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mortgages.component.html',
  styleUrl: './mortgages.component.scss'
})
export class MortgagesComponent {
  reports: MortgageReport[] = [];
  tableReports: MortgageReport[] = [];
  currentRole: string = 'guest';
  isAuthenticated = false;

  constructor(private client: BackendService, private router: Router,
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
    let resp = await this.client.get('mortgage/report').then(data => data.json())
    let tempReports: MortgageReport[] = [];
    if (resp) {
      for (let report of resp) {
        let {
          id, amount, loan, payments, 
          owner, addressid, mortgage, title, 
          agent, type, source, documentation, 
          description, contactid, status, created, 
          updated, contact, mortgagebusiness, 
          mortgageindividual
        } = report;
        
        if (created) {
          created = created.substring(0, 10);
        }
        if (updated) {
          updated = updated.substring(0, 10);
        }

        contact = createContact(contact)

        let business: Business[] = [];
        for (let b of mortgagebusiness) {
          const newbus = createBusiness(b.business);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of mortgageindividual) {
          const newind = createIndividual(i.individual);
          individual.push(newind);
        }

        let mortgagereport = new MortgageReport(id, amount, loan, payments, 
          owner, addressid, mortgage, title, 
          agent, type, source, documentation, 
          description, contactid, status, created, 
          updated, contact, business, 
          individual)
        
          tempReports.push(mortgagereport);
      }
    }
    this.reports = tempReports;
  }

  rowClick(report: MortgageReport) {
    localStorage.setItem('mortgageReport', JSON.stringify(report));
    localStorage.setItem('role', this.currentRole);
    this.router.navigate(['/mortgage/report'])
  }

  getRole() {
    this.tokenService.role.subscribe(roleValue => {
      this.currentRole = roleValue;
      console.log('Current Role:', this.currentRole);
    });
  }
}
