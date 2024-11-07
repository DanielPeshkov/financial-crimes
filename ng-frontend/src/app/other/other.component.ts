import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OtherReport } from '../models/otherreport';
import { BackendService } from '../services/backend.service';
import { Business } from '../models/business';
import { Individual } from '../models/individual';

@Component({
  selector: 'app-other',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './other.component.html',
  styleUrl: './other.component.scss'
})
export class OtherComponent {
  @Input() report: OtherReport = new OtherReport(null, null, null, null, null, null, null, 
                                              null, null, null, null, null, null, [], [])
  idField = new FormControl('idField');
  typeField = new FormControl('typeField');
  sourceField = new FormControl('sourceField');
  incidentdateField = new FormControl('incidentdateField');
  approxField = new FormControl('approxField');
  locationField = new FormControl('locationField');
  documentationField = new FormControl('documentationField');
  descriptionField = new FormControl('descriptionField');
  contactIdField = new FormControl('contactidField');
  statusField = new FormControl('statusField');
  createdField = new FormControl('createdField');
  updatedField = new FormControl('updatedField');

  emailField = new FormControl('email');
  phoneField = new FormControl('phone');

  business: Business[] = [];
  individual: Individual[] = [];

    constructor(private router: Router, private client: BackendService) {
      this.checkForReport();
      this.report = JSON.parse(localStorage.getItem('otherReport')!);
      this.idField.setValue(this.report.id ? this.report.id.toString() : '');
      this.idField.disable();
      this.typeField.setValue(this.report.type);
      this.sourceField.setValue(this.report.source);
      this.incidentdateField.setValue(this.report.incidentDate);
      this.approxField.setValue(this.report.approx ? 'true' : 'false');
      this.locationField.setValue(this.report.location);
      this.documentationField.setValue(this.report.documentation ? 'true' : 'false');
      this.descriptionField.setValue(this.report.description);
      this.contactIdField.setValue(this.report.contactId ? this.report.contactId.toString() : '');
      this.contactIdField.disable();
      this.statusField.setValue(this.report.status ? this.report.status.toString() : '0');
      this.createdField.setValue(this.report.created);
      this.updatedField.setValue(this.report.updated);

      if (this.report.contact) {
        this.emailField.setValue(this.report.contact.email ? this.report.contact.email : '');
        this.phoneField.setValue(this.report.contact.phone ? this.report.contact.phone : '');
      }

      for (let b of this.report.otherbusiness) {
        this.business.push(b.business)
      }
      for (let i of this.report.otherindividual) {
        this.individual.push(i.individual)
      }
  }

  checkForReport() {
    if (!localStorage.getItem('otherReport')) {
      this.router.navigate(['/other'])
    }
  }

  async submitTeam() {
    let contact = {
      "email": this.emailField.getRawValue(),
      "phone": this.phoneField.getRawValue(),
    }
    this.client.put(`contact/${this.contactIdField.getRawValue()}`, contact)
    let data = {
      "id": Number(this.idField.getRawValue()),
      "type": this.typeField.getRawValue(),
      "source": this.sourceField.getRawValue(),
      "incidentDate": this.incidentdateField.getRawValue(),
      "approx": Boolean(this.approxField.getRawValue()),
      "location": this.locationField.getRawValue(),
      "documentation": Boolean(this.documentationField.getRawValue()),
      "description": this.descriptionField.getRawValue(),
      "contactId": this.contactIdField.getRawValue(),
      "status": this.statusField.getRawValue(),
      "created": this.createdField.getRawValue(),
      "updated": Date.now(),
    }
    let resp = await this.client.put(`other/report/${this.idField.getRawValue()}`, data).then(data => data.json());
    console.log(resp)
    this.router.navigate(['/other']);
  }

  cancel() {
    this.router.navigate(['/other']);
  }

  async delete() {
    const id = this.idField.getRawValue();
    if (id) {
      await this.client.delete(`other/report/${id}`)
    }
    this.router.navigate(['/other']);
  }
}
