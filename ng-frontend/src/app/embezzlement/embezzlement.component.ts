import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmbezzlementReport } from '../models/embezzlementreport';
import { BackendService } from '../services/backend.service';
import { Business } from '../models/business';
import { Individual } from '../models/individual';

@Component({
  selector: 'app-embezzlement',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './embezzlement.component.html',
  styleUrl: './embezzlement.component.scss'
})
export class EmbezzlementComponent {
  @Input() report: EmbezzlementReport = new EmbezzlementReport(null, null, null, null, null, null, null, 
    null, null, null, null, null, null, [], [])
    idField = new FormControl('idField');
    amountField = new FormControl('amountField');
    employeeField = new FormControl('employeeField');
    typeField = new FormControl('typeField');
    locationField = new FormControl('locationField');
    sourceField = new FormControl('sourceField');
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

    currentRole: string = 'guest';

    constructor(private router: Router, private client: BackendService) {
      this.checkForReport();
      this.report = JSON.parse(localStorage.getItem('embezzlementReport')!);
      this.idField.setValue(this.report.id ? this.report.id.toString() : '');
      this.idField.disable();
      this.amountField.setValue(this.report.amount? this.report.amount.toString() : '');
      this.employeeField.setValue(this.report.employee? 'true' : '');
      this.typeField.setValue(this.report.type ? this.report.type : '');
      this.locationField.setValue(this.report.location ? this.report.location : 'false');
      this.sourceField.setValue(this.report.source ? this.report.source : '');
      this.documentationField.setValue(this.report.documentation ? 'true' : 'false');
      this.descriptionField.setValue(this.report.description);
      this.contactIdField.setValue(this.report.contactid ? this.report.contactid.toString() : '');
      this.contactIdField.disable();
      this.statusField.setValue(this.report.status ? this.report.status.toString() : '0');
      this.createdField.setValue(this.report.created);
      this.updatedField.setValue(this.report.updated);

      if (this.report.contact) {
        this.emailField.setValue(this.report.contact.email ? this.report.contact.email : '');
        this.phoneField.setValue(this.report.contact.phone ? this.report.contact.phone : '');
      }

      for (let b of this.report.embezzlementbusiness) {
        this.business.push(b)
      }
      for (let i of this.report.embezzlementindividual) {
        this.individual.push(i)
      }

    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      this.currentRole = storedRole;
      console.log(this.currentRole)
    }
    }

    checkForReport() {
      if (!localStorage.getItem('embezzlementReport')) {
        this.router.navigate(['/embezzlement'])
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
        "amount": this.amountField.getRawValue(),
        "employee": this.employeeField.getRawValue(),
        "type": this.typeField.getRawValue(),
        "location": Boolean(this.locationField.getRawValue()),
        "source": this.sourceField.getRawValue(),
        "documentation": Boolean(this.documentationField.getRawValue()),
        "description": this.descriptionField.getRawValue(),
        "contactId": this.contactIdField.getRawValue(),
        "status": this.statusField.getRawValue(),
        "created": this.createdField.getRawValue(),
        "updated": Date.now(),
      }
      let resp = await this.client.put(`embezzlement/report/${this.idField.getRawValue()}`, data).then(data => data.json());
      console.log(resp)
      this.router.navigate(['/embezzlement']);
    }

    cancel() {
      this.router.navigate(['/embezzlement']);
    }

    async delete() {
      const id = this.idField.getRawValue();
      if (id) {
        await this.client.delete(`embezzlement/report/${id}`)
      }
      this.router.navigate(['/embezzlement']);
    }
}

