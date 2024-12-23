import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { InstitutionReport } from '../models/institutionreport';
import { TokenService } from '../services/token.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-institutions',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {
  reports: InstitutionReport[] = [];
  tableReports: InstitutionReport[] = [];
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
    let resp = await this.client.get('institution/report').then(data => data.json())
    let tempReports: InstitutionReport[] = [];
    if (resp) {
      for (let report of resp) {
        let {
        id, amount, institution, 
        incidentdate, approx, method, employee,
        source, documentation, description, 
        contactid, status, created, updated, 
        contact, institutionbusiness, institutionindividual
        } = report;
        
        if (created) {
          created = created.substring(0, 10);
        }
        if (updated) {
          updated = updated.substring(0, 10);
        }
        if (incidentdate) {
          incidentdate = incidentdate.substring(0, 10);
        }

        contact = createContact(contact)

        let business: Business[] = [];
        for (let b of institutionbusiness) {
          const newbus = createBusiness(b.business);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of institutionindividual) {
          const newind = createIndividual(i.individual);
          individual.push(newind);
        }

        let institutionreport = new InstitutionReport(id, amount, institution, 
          incidentdate, approx, method, employee,
          source, documentation, description, 
          contactid, status, created, updated, 
          contact, institutionbusiness, institutionindividual)
        
          tempReports.push(institutionreport);
      }
    }
    this.reports = tempReports;
  }

  rowClick(report: InstitutionReport) {
    localStorage.setItem('institutionReport', JSON.stringify(report))
    localStorage.setItem('role', this.currentRole);
    this.router.navigate(['/institution/report'])
  }

  getRole() {
    this.tokenService.role.subscribe(roleValue => {
      this.currentRole = roleValue;
      console.log('Current Role:', this.currentRole);
    });
  }
}
