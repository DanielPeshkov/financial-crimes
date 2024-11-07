import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { InvestmentReport } from '../models/investmentreport';
import { AuthService } from '@auth0/auth0-angular';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss'
})
export class InvestmentsComponent {
  reports: InvestmentReport[] = [];
  tableReports: InvestmentReport[] = [];
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
    let resp = await this.client.get('investment/report').then(data => data.json())
    let tempReports: InvestmentReport[] = [];
    if (resp) {
      for (let report of resp) {
        let {
        id, amount, loss, 
        force, promise, contract, method,
        funds, communication,
        source, documentation, description, 
        contactid, status, created, updated, 
        contact, investmentbusiness, 
        investmentindividual
        } = report;
        
        if (created) {
          created = created.substring(0, 10);
        }
        if (updated) {
          updated = updated.substring(0, 10);
        }

        contact = createContact(contact)

        let business: Business[] = [];
        for (let b of investmentbusiness) {
          const newbus = createBusiness(b);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of investmentindividual) {
          const newind = createIndividual(i);
          individual.push(newind);
        }

        let investmentreport = new InvestmentReport(id, amount, loss, 
          force, promise, contract, method,
          funds, communication,
          source, documentation, description, 
          contactid, status, created, updated, 
          contact, investmentbusiness, 
          investmentindividual)
        
          tempReports.push(investmentreport);
      }
    }
    this.reports = tempReports;
  }

  rowClick(report: InvestmentReport) {
    localStorage.setItem('investmentReport', JSON.stringify(report));
    localStorage.setItem('role', this.currentRole);
    this.router.navigate(['/investment/report'])
  }

  getRole() {
    this.tokenService.role.subscribe(roleValue => {
      this.currentRole = roleValue;
      console.log('Current Role:', this.currentRole);
    });
  }
}
