import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';
import { EmbezzlementReport } from '../models/embezzlementreport';

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

  constructor(private client: BackendService, private router: Router) {}

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
          const newbus = createBusiness(b);
          business.push(newbus);
        }

        let individual: Individual[] = []
        for (let i of embezzlementindividual) {
          const newind = createIndividual(i);
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
    localStorage.setItem('embezzlementReport', JSON.stringify(report))
    this.router.navigate(['/embezzlement/report'])
  }
}
