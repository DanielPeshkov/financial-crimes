import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LaunderingReport } from '../models/launderingreport';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-laundering',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './laundering.component.html',
  styleUrl: './laundering.component.scss'
})
export class LaunderingComponent {
  @Input() report: LaunderingReport = new LaunderingReport(null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, null, [], [])

  idField = new FormControl('idField');
  amountField = new FormControl('amountField');
  sourceField = new FormControl('sourceField');
  methodField = new FormControl('methodField');
  processingField = new FormControl('processingField');
  locationField = new FormControl('locationField');
  incidentDateField = new FormControl('incidentDateField');
  approxField = new FormControl('approxField');
  organizedField = new FormControl('organizedField');
  documentationField = new FormControl('documentationField');
  descriptionField = new FormControl('descriptionField');
  contactIdField = new FormControl('contactIdField');
  statusField = new FormControl('statusField');
  createdField = new FormControl('createdField');
  updatedField = new FormControl('updatedField');

  emailField = new FormControl('email');
  phoneField = new FormControl('phone');

  currentRole: string = 'guest';

  constructor(private router: Router, private client: BackendService) {
    this.checkForReport();
    this.report = JSON.parse(localStorage.getItem('launderingReport')!);

    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      this.currentRole = storedRole;
      console.log(this.currentRole)
    }

    // Set initial values to match field names
    this.idField.setValue(this.report.id ? this.report.id.toString() : '');
    this.amountField.setValue(this.report.amount ? this.report.amount.toString() : '0');
    this.sourceField.setValue(this.report.source);
    this.methodField.setValue(this.report.method);
    this.processingField.setValue(this.report.processing);
    this.locationField.setValue(this.report.location);
    this.incidentDateField.setValue(this.report.incidentDate);
    this.approxField.setValue(this.report.approx ? this.report.approx.toString() : '');
    this.organizedField.setValue(this.report.organized);
    this.documentationField.setValue(this.report.documentation ? this.report.documentation.toString() : '');
    this.descriptionField.setValue(this.report.description);
    this.contactIdField.setValue(this.report.contactId ? this.report.contactId.toString() : '');
    this.statusField.setValue(this.report.status ? this.report.status.toString() : '0');
    this.createdField.setValue(this.report.created);
    this.updatedField.setValue(this.report.updated);

    if (this.report.contact) {
      this.emailField.setValue(this.report.contact.email ? this.report.contact.email : '');
      this.phoneField.setValue(this.report.contact.phone ? this.report.contact.phone : '');
    }
  }

  checkForReport() {
    if (!localStorage.getItem('launderingReport')) {
      this.router.navigate(['/laundering'])
    }
  }

  async submitTeam() {
    let data = {
      "id": Number(this.idField.getRawValue()),
      "amount": this.amountField.getRawValue(),
      "source": this.sourceField.getRawValue(),
      "method": this.methodField.getRawValue(),
      "processing": this.processingField.getRawValue(),
      "location": this.locationField.getRawValue(),
      "incidentDate": this.incidentDateField.getRawValue(),
      "approx": this.approxField.getRawValue(),
      "organized": this.organizedField.getRawValue(),
      "documentation": this.documentationField.getRawValue(),
      "description": this.descriptionField.getRawValue(),
      "contactId": this.contactIdField.getRawValue(),
      "status": this.statusField.getRawValue(),
      "created": this.createdField.getRawValue(),
      "updated": Date.now(),
    }
    let resp = await this.client.put(`laundering/report/${this.idField.getRawValue()}`, data).then(data => data.json());
    console.log(resp)
    resp = await this.client.get(`laundering/report/${this.idField.getRawValue()}`).then(data => data.json())
    console.log('Data: ', resp)
    this.router.navigate(['/laundering']);
  }

  cancel() {
    this.router.navigate(['/laundering']);
  }

  delete() {
    const id = this.idField.getRawValue();
    if (id) {
      this.client.delete(`laundering/report/${id}`)
    }
    this.router.navigate(['/laundering']);
  }
}

