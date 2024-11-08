import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OtherReport } from '../models/otherreport';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { OtherIndividual } from '../models/otherindividual';
import { OtherBusiness } from '../models/otherbusiness';
import { AuthService } from '@auth0/auth0-angular';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './others.component.html',
  styleUrl: './others.component.scss'
})
export class OthersComponent implements OnInit{
  reports: OtherReport[] = [];
  tableReports: OtherReport[] = [];
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
    let resp = await this.client.get('other/report').then(data => data.json())
    let tempReports: OtherReport[] = [];
    if (resp) {
      for (let report of resp) {
        let {
          id, type, source, incidentdate, approx, location, documentation,
          description, contactId, status, created, updated, contact, 
          otherbusiness, otherindividual
        } = report;
        if (incidentdate) {
          incidentdate = incidentdate.substring(0,10);
        }
        if (created) {
          created = created.substring(0, 10);
        }
        if (updated) {
          updated = updated.substring(0, 10);
        }

        contact = createContact(contact)

        let business: OtherBusiness[] = [];
        for (let b of otherbusiness) {
          const newbus = createBusiness(b.business);
          business.push(new OtherBusiness(null, null, null, null, newbus));
        }

        let individual: OtherIndividual[] = []
        for (let i of otherindividual) {
          const newind = createIndividual(i.individual);
          individual.push(new OtherIndividual(null, null, null, null, newind));
        }

        let other = new OtherReport(id, type, source, 
          incidentdate, approx, location, documentation, 
          description, contactId, status, created, 
          updated, contact, business, 
          individual)
        
          tempReports.push(other);
      }
    }
    this.reports = tempReports;
  }

  rowClick(report: OtherReport) {
    localStorage.setItem('otherReport', JSON.stringify(report));
    localStorage.setItem('role', this.currentRole);
    this.router.navigate(['/other/report'])
  }

  getRole() {
    this.tokenService.role.subscribe(roleValue => {
      this.currentRole = roleValue;
      console.log('Current Role:', this.currentRole);
    });
  }
}
