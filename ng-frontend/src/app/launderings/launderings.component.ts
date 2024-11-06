import { LaunderingReport } from '../models/launderingreport';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';
import { Contact, createContact } from '../models/contact';
import { Business, createBusiness } from '../models/business';
import { Address } from '../models/address';
import { createIndividual, Individual } from '../models/individual';
import { Router } from '@angular/router';

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

  constructor(private client: BackendService, private router: Router) {}

  async ngOnInit() {
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
}

