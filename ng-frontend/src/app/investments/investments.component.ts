import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { InvestmentReport } from '../models/investmentreport';

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

  constructor(private client: BackendService, private router: Router) {}

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
          const newbus = createBusiness(b.business);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of investmentindividual) {
          const newind = createIndividual(i.individual);
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
    localStorage.setItem('investmentReport', JSON.stringify(report))
    this.router.navigate(['/investment/report'])
  }
}
