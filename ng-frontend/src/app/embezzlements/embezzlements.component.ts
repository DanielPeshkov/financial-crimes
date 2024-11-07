import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { EmbezzlementReport } from '../models/embezzlementreport';
import { TokenService } from '../services/token.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-embezzlements',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './embezzlements.component.html',
  styleUrl: './embezzlements.component.scss'
})
export class EmbezzlementsComponent {
  reports: EmbezzlementReport[] = [];
  tableReports: EmbezzlementReport[] = [];
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
    let resp = await this.client.get('embezzlement/report').then(data => data.json())
    let tempReports: EmbezzlementReport[] = [];
    if (resp) {
      for (let report of resp) {
        let {
          id, amount, employee, type, location, source, documentation, 
          description, contactid, status, created, updated, contact, 
          embezzlementbusiness, embezzlementindividual
        } = report;
        
        if (created) {
          created = created.substring(0, 10);
        }
        if (updated) {
          updated = updated.substring(0, 10);
        }

        contact = createContact(contact)

        let business: Business[] = [];
        for (let b of embezzlementbusiness) {
          const newbus = createBusiness(b.business);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of embezzlementindividual) {
          const newind = createIndividual(i.individual);
          individual.push(newind);
        }

        let embezzlementreport = new EmbezzlementReport(id, amount, employee, 
          type, location, source, documentation, 
          description, contactid, status, created, updated, contact, 
          embezzlementbusiness, embezzlementindividual)
        
          tempReports.push(embezzlementreport);
      }
    }
    this.reports = tempReports;
  }

  rowClick(report: EmbezzlementReport) {
    localStorage.setItem('embezzlementReport', JSON.stringify(report));
    localStorage.setItem('role', this.currentRole);
    this.router.navigate(['/embezzlement/report'])
  }

  getRole() {
    this.tokenService.role.subscribe(roleValue => {
      this.currentRole = roleValue;
      console.log('Current Role:', this.currentRole);
    });
  }
}
